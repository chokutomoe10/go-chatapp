package httpserver

import (
	"encoding/json"
	"fmt"
	"gochatapp/pkg/redisrepo"
	"log"
	"net/http"
)

type useReq struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Client   string `json:"client"`
}

type response struct {
	Status  bool        `json:"status"`
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
	Total   int         `json:"total,omitempty"`
}

func registerHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	u := &useReq{}
	if err := json.NewDecoder(r.Body).Decode(u); err != nil {
		http.Error(w, "error decoding request  object", http.StatusBadRequest)
		return
	}

	res := register(u)
	json.NewEncoder(w).Encode(res)
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	u := &useReq{}
	if err := json.NewDecoder(r.Body).Decode(u); err != nil {
		http.Error(w, "error decoding request  object", http.StatusBadRequest)
		return
	}

	res := login(u)
	json.NewEncoder(w).Encode(res)
}

func verifyContactHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	u := &useReq{}
	if err := json.NewDecoder(r.Body).Decode(u); err != nil {
		http.Error(w, "error decoding request  object", http.StatusBadRequest)
		return
	}

	res := verifyContact(u.Username)
	json.NewEncoder(w).Encode(res)
}

func chatHistoryHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	u1 := r.URL.Query().Get("u1")
	u2 := r.URL.Query().Get("u2")
	fromTs, toTs := "0", "+inf"

	if r.URL.Query().Get("from-ts") != "" && r.URL.Query().Get("to-ts") != "" {
		fromTs = r.URL.Query().Get("from-ts")
		toTs = r.URL.Query().Get("to-ts")
	}

	res := chatHistory(u1, u2, fromTs, toTs)
	json.NewEncoder(w).Encode(res)
}

func contactListHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	u := r.URL.Query().Get("username")

	res := contactList(u)
	json.NewEncoder(w).Encode(res)
}

func register(u *useReq) *response {
	res := &response{Status: true}

	status := redisrepo.IsUserExist(u.Username)
	if status {
		res.Status = false
		res.Message = "username already taken. Try something else."
		return res
	}

	err := redisrepo.RegisterNewUser(u.Username, u.Password)
	if err != nil {
		res.Status = false
		res.Message = "something went wrong while registering the user. please try again after sometime."
		return res
	}

	return res
}

func login(u *useReq) *response {
	res := &response{Status: true}

	err := redisrepo.IsUserAuthentic(u.Username, u.Password)
	if err != nil {
		res.Status = false
		res.Message = err.Error()
		return res
	}

	return res
}

func verifyContact(username string) *response {
	res := &response{Status: true}

	status := redisrepo.IsUserExist(username)
	if !status {
		res.Status = false
		res.Message = "invalid username"
	}

	return res
}

func chatHistory(username1, username2, fromTS, toTs string) *response {
	res := &response{}

	fmt.Println(username1, username2)

	if !redisrepo.IsUserExist(username1) || !redisrepo.IsUserExist(username2) {
		res.Message = "incorrect username"
		return res
	}

	chats, err := redisrepo.FetchChatBetween(username1, username2, fromTS, toTs)
	if err != nil {
		log.Println("error in fetch chat between", err)
		res.Message = "unable to fetch chat history. please try again later."
		return res
	}

	res.Status = true
	res.Data = chats
	res.Total = len(chats)
	return res
}

func contactList(username string) *response {
	res := &response{}

	if !redisrepo.IsUserExist(username) {
		res.Message = "incorrect username"
		return res
	}

	contactList, err := redisrepo.FetchContactList(username)
	if err != nil {
		log.Println("error in fetch contact list of username: ", username, err)
		res.Message = "unable to fetch contact list. please try again later."
		return res
	}

	res.Status = true
	res.Data = contactList
	res.Total = len(contactList)
	return res
}
