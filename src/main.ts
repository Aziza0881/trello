import { reload } from "./modules/ul";
import { Item } from "./types";

const places:NodeListOf<HTMLDivElement> = document.querySelectorAll('.tasks')


let arr: Array<Item> = [
    {
        id: "task one",
        title: "Three",
        description: "string",
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        id: "two",
        title: "Two",
        description: "string",
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        id: "three",
        title: "One",
        description: "string",
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
    },
]

reload({arr, places})