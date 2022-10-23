import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { getUser } from "../services/userService.js";


const navTemp = (user) => html`
    <nav>
        <a href="/">Theater</a>
        <ul>
            ${user
                ? html`
                    <li><a href="/profile">Profile</a></li>
                    <li><a href="create">Create Event</a></li>
                    <li><a href="/logout">Logout</a></li>
                `
                : html`
                    <li><a href="/login">Login</a></li>
                    <li><a href="/register">Register</a></li>
                `
            }
        </ul>
    </nav>
`
const header = document.getElementById('navigator');
const main = document.getElementById('content');

function addRender(template) {
    render(template, main);
}

export function navView(ctx, next) {
    ctx.user = getUser();
    render(navTemp(ctx.user), header);
    ctx.render = addRender;
    next();
}