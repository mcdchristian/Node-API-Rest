import jwt from 'jsonwebtoken';
import privateKey from '../auth/private_key.js';

export default (req, res, next) => {
	const authorizationHeader = req.headers.authorization;

	if (!authorizationHeader) {
		const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`;
		return res.status(401).json({ message });
	}

	const token = authorizationHeader.split(' ')[1];
	jwt.verify(token, privateKey, (error, decodedToken) => {
		if (error) {
			const message = `L'utilisateur n'est pas autorisé à accèder à cette ressource.`;
			return res.status(401).json({ message, data: error });
		}

		const userId = decodedToken.userId;
		if (req.body.userId && req.body.userId !== userId) {
			const message = `L'identifiant de l'utilisateur est invalide.`;
			res.status(401).json({ message });
		} else {
			next();
		}
	});
};

//example of react code

/* 
import React, { useEffect } from "react";
import axios from "axios";
import "./styles.css";

const App = () => {
  useEffect(() => {
    // Step 1 : "Hello, Heroku ! 👋"
    axios
      .get("https://cryptic-sands-41262.herokuapp.com")
      .then((res) => console.log(res.data));

    // Step 2 : "Get JWT token 🔓"
    axios
      .post(
        "https://cryptic-sands-41262.herokuapp.com/api/login",
        { username: "pikachu", password: "pikachu" },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        return res.token;
      })
      .then((token) => fetchPokemonlist(token));
  }, []);

  // Step 3 : "Get pokemon list 🎉"
  const fetchPokemonlist = (token) => {
    return axios
      .get("https://cryptic-sands-41262.herokuapp.com/api/pokemons", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => res.data)
      .then((res) => console.log(res));
  };

  return (
    <div className="App">
      <h1>Hello, Heroku ! 👋</h1>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png"
        alt="React Logo"
        width="300"
      />
    </div>
  );
};

export default App;

*/

//example of angular code
/* 

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { tap, switchMap } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Step 1 : "Hello, Heroku ! 👋"
    this.http
      .get("https://cryptic-sands-41262.herokuapp.com/")
      .subscribe((res) => console.log(res));

    // Step 2 : "Get JWT token 🔓"
    this.http
      .post(
        "https://cryptic-sands-41262.herokuapp.com/api/login",
        { username: "pikachu", password: "pikachu" },
        this.httpOptions
      )
      .pipe(
        tap((res) => console.log(res)),
        switchMap((res) => this.fetchPokemonlist(res.token))
      )
      .subscribe((res) => console.log(res));
  }

  // Step 3 : "Get pokemon list 🎉"
  fetchPokemonlist(token: string) {
    const httpOptionsWithJWT = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };

    return this.http.get(
      "https://cryptic-sands-41262.herokuapp.com/api/pokemons",
      httpOptionsWithJWT
    );
  }
}
*/
