import { html } from "../../node_modules/lit-html/lit-html.js";
import * as request from '../services/api.js'


const editTemp = (card, onSubmit) => html`
<section id="editPage">
            <form @submit=${onSubmit} class="theater-form">
                <h1>Edit Theater</h1>
                <div>
                    <label for="title">Title:</label>
                    <input id="title" name="title" type="text" placeholder="Theater name" value=${card.title}>
                </div>
                <div>
                    <label for="date">Date:</label>
                    <input id="date" name="date" type="text" placeholder="Month Day, Year" value=${card.date}>
                </div>
                <div>
                    <label for="author">Author:</label>
                    <input id="author" name="author" type="text" placeholder="Author"
                        value=${card.author}>
                </div>
                <div>
                    <label for="description">Theater Description:</label>
                    <textarea id="description" name="description"
                        placeholder="Description">${card.description}</textarea>
                </div>
                <div>
                    <label for="imageUrl">Image url:</label>
                    <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url"
                        value=${card.imageUrl}>
                </div>
                <button class="btn" type="submit">Submit</button>
            </form>
        </section>
`;

export async function editView(ctx) {
    const card = await request.get(`/data/theaters/${ctx.params.id}`);
    
    async function onSubmit(event) {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target));
        
        if (Object.values(data).some(v => v == '')) {
            
            return alert('All fields are required');
        }
        
        const result = await request.put(`/data/theaters/${ctx.params.id}`,
        {
            title: data.title,
            date: data.date,
            author: data.author,
            description: data.description,
            imageUrl: data.imageUrl
        })
        
        
        ctx.page.redirect(`/details/${ctx.params.id}`)
    }
    
    
    ctx.render(editTemp(card, onSubmit))
}