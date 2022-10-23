import { html } from "../../node_modules/lit-html/lit-html.js";
import * as request from '../services/api.js'
import { setUser } from "../services/userService.js";

const loginTemp = (onSubmit) => html`
    <section id="loginaPage">
        <form @submit=${onSubmit} class="loginForm">
            <h2>Login</h2>
            <div>
                <label for="email">Email:</label>
                <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
            </div>
            <div>
                <label for="password">Password:</label>
                <input id="password" name="password" type="password" placeholder="********" value="">
            </div>
    
            <button class="btn" type="submit">Login</button>
    
            <p class="field">
                <span>If you don't have profile click <a href="/register">here</a></span>
            </p>
        </form>
    </section>
`

export async function loginView(ctx) {

    async function onSubmit(event) {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target));
        
        if (data.email === '' || data.password === '') {
            return alert('All fields must be filled!')
        }
        
        const user = await request.post('/users/login',
        {
            email: data.email,
            password: data.password
        })
        
        
        if (user.accessToken) {
            setUser(user);
            ctx.page.redirect('/')
        }
    }


    ctx.render(loginTemp(onSubmit))
}

