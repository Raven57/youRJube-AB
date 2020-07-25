package main

import (
  "github.com/99designs/gqlgen/graphql/handler/transport"
  "github.com/Raven57/yourjube-back-end/graph/postgres"
  "github.com/go-chi/chi"
  "github.com/go-pg/pg/v10"
  "github.com/gorilla/websocket"
  "github.com/rs/cors"
  "log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/Raven57/yourjube-back-end/graph"
	"github.com/Raven57/yourjube-back-end/graph/generated"
)

const defaultPort = "5555"

func main() {


  pgDB :=postgres.New(&pg.Options{
    //Addr:	"172.19.128.3:5432",
    Addr:	"127.0.0.1:5433",
    User: "postgres",
    Password: "postgres",
    Database: "postgres",
  })

  pgDB.AddQueryHook(postgres.DBLogger{})

  defer pgDB.Close()

  port := os.Getenv("PORT")
  if port == "" {
    port = defaultPort
    log.Printf("Defaulting to port %s",port)
  }


  router := chi.NewRouter()

  router.Use(cors.New(cors.Options{
    AllowedOrigins:   []string{"https://tpa-webab.web.app","http://localhost:4200","http://localhost:5555/"},
    AllowCredentials: true,
    Debug:            true,
  }).Handler)

  srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{
    DB: pgDB,
    UsersRepo: postgres.UsersRepo{DB: pgDB},
    PremiumtypesRepo: postgres.PremiumtypesRepo{DB: pgDB},

  }}))
  srv.AddTransport(&transport.Websocket{
    Upgrader: websocket.Upgrader{
      CheckOrigin: func(r *http.Request) bool {
        // Check against your desired domains here
        return r.Host == "https://tpa-webab.web.app"
      },
      ReadBufferSize:  1024,
      WriteBufferSize: 1024,
    },
  })

  //http.Handle("/", playground.Handler("GraphQL playground", "/query"))
  //http.Handle("/query", srv)
  //
  //log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
  //log.Fatal(http.ListenAndServe(":"+port, nil))

  router.Handle("/", playground.Handler("GraphQL playground", "/query"))
  router.Handle("/query", srv)

  err := http.ListenAndServe(":"+port, router)
  if err != nil {
    panic(err)
  }
}
