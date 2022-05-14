import React from "react";

export default function Enter() {
    return (
    <div>
        <h1>Добро пожаловать в нашу поликлинику</h1>
        <br></br>
        <form action="/auth">
            <button className="btn btn-primary">Вход</button>
        </form>
        <br></br>
        <form action="/registration">
            <button className="btn btn-secondary">Регистрация</button>
        </form>
    </div>
    )

}