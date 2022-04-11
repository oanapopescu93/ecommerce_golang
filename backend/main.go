package main

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/gorilla/mux"
)

// var a = [6]int{2, 3, 5, 7, 11, 13}
// var b = []string{"oana"}

type discount struct {
	Name   string
	Amount int
}

type product struct {
	ID                int
	Name              string
	Img               string
	Category          string
	Quantity          int
	Price             float32
	Discount          int
	Rating            float32
	Rating_number     int
	Description_long  string
	Description_short string
	Other_img         []string
	Color             []string
	Size              []float32
}

var products = []product{}
var discounts = []discount{
	{Name: "discount001", Amount: 10},
	{Name: "discount002", Amount: 11},
	{Name: "discount003", Amount: 12},
}

func create_products() {
	products = []product{}
	for i := 0; i < 3; i++ {
		item := product{
			ID:                i,
			Name:              "Name1",
			Img:               "https://preview.redd.it/uujc8wucerz61.png?width=960&crop=smart&auto=webp&s=b87c02135bbf94b0cc4772361282a4e8153a1937",
			Category:          "Category1",
			Quantity:          10,
			Price:             12.3,
			Discount:          50,
			Rating:            0,
			Rating_number:     0,
			Description_long:  "Description_long111",
			Description_short: "Description_short111",
			Other_img: []string{
				"https://preview.redd.it/uujc8wucerz61.png?width=960&crop=smart&auto=webp&s=b87c02135bbf94b0cc4772361282a4e8153a1937",
				"https://preview.redd.it/uujc8wucerz61.png?width=960&crop=smart&auto=webp&s=b87c02135bbf94b0cc4772361282a4e8153a1937",
				"https://preview.redd.it/uujc8wucerz61.png?width=960&crop=smart&auto=webp&s=b87c02135bbf94b0cc4772361282a4e8153a1937",
			},
			Color: []string{
				"white",
				"black",
				"red",
				"yellow",
			},
			Size: []float32{1.11, 2.11, 3.11},
		}
		products = append(products, item)
	}
	for i := 3; i < 6; i++ {
		item := product{
			ID:                i,
			Name:              "Name2",
			Img:               "https://preview.redd.it/uujc8wucerz61.png?width=960&crop=smart&auto=webp&s=b87c02135bbf94b0cc4772361282a4e8153a1937",
			Category:          "Category2",
			Quantity:          5,
			Price:             45.6,
			Discount:          0,
			Rating:            3.5,
			Rating_number:     5,
			Description_long:  "Description_long222",
			Description_short: "Description_short222",
			Other_img: []string{
				"https://preview.redd.it/uujc8wucerz61.png?width=960&crop=smart&auto=webp&s=b87c02135bbf94b0cc4772361282a4e8153a1937",
				"https://preview.redd.it/uujc8wucerz61.png?width=960&crop=smart&auto=webp&s=b87c02135bbf94b0cc4772361282a4e8153a1937",
				"https://preview.redd.it/uujc8wucerz61.png?width=960&crop=smart&auto=webp&s=b87c02135bbf94b0cc4772361282a4e8153a1937",
			},
			Color: []string{
				"red",
				"yellow",
			},
			Size: []float32{1.22, 2.22, 3.22},
		}
		products = append(products, item)
	}
	for i := 6; i < 9; i++ {
		item := product{
			ID:                i,
			Name:              "Name3",
			Img:               "https://preview.redd.it/uujc8wucerz61.png?width=960&crop=smart&auto=webp&s=b87c02135bbf94b0cc4772361282a4e8153a1937",
			Category:          "Category3",
			Quantity:          0,
			Price:             78.9,
			Discount:          10,
			Rating:            4.5,
			Rating_number:     10,
			Description_long:  "Description_long333",
			Description_short: "Description_short333",
			Other_img: []string{
				"https://preview.redd.it/uujc8wucerz61.png?width=960&crop=smart&auto=webp&s=b87c02135bbf94b0cc4772361282a4e8153a1937",
				"https://preview.redd.it/uujc8wucerz61.png?width=960&crop=smart&auto=webp&s=b87c02135bbf94b0cc4772361282a4e8153a1937",
				"https://preview.redd.it/uujc8wucerz61.png?width=960&crop=smart&auto=webp&s=b87c02135bbf94b0cc4772361282a4e8153a1937",
			},
			Size: []float32{1.33, 2.33, 3.33},
		}
		products = append(products, item)
	}
}

func getList(w http.ResponseWriter, r *http.Request) {
	create_products()
	send, err := json.Marshal(products)
	if err != nil {
		panic(err)
	}
	w.Write(send)
}

func getItem(w http.ResponseWriter, r *http.Request) {
	create_products()
	vars := mux.Vars(r)
	token := vars["item"]
	for i, x := range products {
		t := strconv.Itoa(i)
		if t == token {
			send, err := json.Marshal(x)
			if err != nil {
				panic(err)
			}
			w.Write(send)
		}
	}
}

func getDiscount(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	text_discount := vars
	log.Println("text_discount ", text_discount)

	var discount = false
	send, err := json.Marshal(discount)
	if err != nil {
		panic(err)
	}
	w.Write(send)
}

func main() {
	r := mux.NewRouter()

	r.HandleFunc("/items/{item}", getItem)
	r.HandleFunc("/getList", getList)

	r.HandleFunc("/getDiscount", getDiscount)

	// r.PathPrefix("/").Handler(http.StripPrefix("/", http.FileServer(http.Dir("./static/"))))
	r.PathPrefix("/").Handler(http.StripPrefix("/", http.FileServer(http.Dir("../frontend/build/"))))

	srv := &http.Server{
		Handler:      r,
		Addr:         "127.0.0.1:8000",
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Println("Listening...")
	log.Fatal(srv.ListenAndServe())
}
