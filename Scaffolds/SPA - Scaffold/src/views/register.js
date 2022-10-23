import { html } from "../../node_modules/lit-html/lit-html.js";
import * as request from '../services/api.js'
import { setUser } from "../services/userService.js";

const registerTemp = (onSubmit) => html`
    <section id="registerPage">
        <form @submit=${onSubmit} class="registerForm">
            <h2>Register</h2>
            <div class="on-dark">
                <label for="email">Email:</label>
                <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
            </div>
    
            <div class="on-dark">
                <label for="password">Password:</label>
                <input id="password" name="password" type="password" placeholder="********" value="">
            </div>
    
            <div class="on-dark">
                <label for="repeatPassword">Repeat Password:</label>
                <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="">
            </div>
    
            <button class="btn" type="submit">Register</button>
    
            <p class="field">
                <span>If you have profile click <a href="/login">here</a></span>
            </p>
        </form>
    </section>
`;
export function registerView(ctx) {

    async function onSubmit(event) {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target));
        
        if(data.repeatPassword === '' || data.email === '' || data.password === '') {


            return alert('All fields must be filled!')
        }
        if (data.password !== data.repeatPassword) {
            

            return  alert('Passwords must match!')
        }

        const user = await request.post('/users/register', 
            {
                email: data.email,
                password: data.password,
            })

            if (user) {
                setUser(user)
                ctx.page.redirect('/')
            }
    }

    
    ctx.render(registerTemp(onSubmit))
}