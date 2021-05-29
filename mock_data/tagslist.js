// id would be a mongo id when using actual data
const items = [
    {
        id: "ite-1",
        name: "Men's Clothing",
        keywords: ['Clothes', 'Jeans', 'Shirts', 'Male']
    },
    {
        id: "ite-2",
        name: "Women’s Clothing",
        keywords: ['Clothes', 'Jeans', 'Shirts', 'Female']
    },
    {
        id: "ite-3",
        name: "Children’s Clothing",
        keywords: ['Clothes', 'Jeans', 'Shirts', 'Kid', 'Toddler']
    },
    {
        id: "ite-4",
        name: "Baby Clothing",
        keywords: ['Clothes', 'Jeans', 'Shirts', 'Kid', 'Toddler', 'Infant']
    },
    {
        id: "ite-5",
        name: "Shoes",
        keywords: ['Clothes', 'Accessor']
    },
    {
        id: "ite-6",
        name: "Bags",
        keywords: ['Women', 'Men', 'Purse', 'Accessor']
    },
    {
        id: "ite-7",
        name: "Jewelry",
        keywords: ['Women', 'Men', 'Necklace', 'Bracelet', 'Earring', 'Accessor']
    },
    {
        id: "ite-8",
        name: "Makeup",
        keywords: ['Women', 'Men', 'Mascara', 'Lipstick', 'Accessor']
    },
    {
        id: "ite-9",
        name: "Kitchenware",
        keywords: ['Pot', 'Pan', 'Utensil', 'Knife']
    },
    {
        id: "ite-10",
        name: "Books",
        keywords: ['School suppl', 'Novels']
    },
    {
        id: "ite-11",
        name: "Notebooks",
        keywords: ['School suppl',]
    },
    {
        id: "ite-12",
        name: "Textbooks",
        keywords: ['School suppl',]
    },
    {
        id: "ite-13",
        name: "Writing Utensils",
        keywords: ['School suppl', 'Pencils', 'Pens', 'Markers', 'Highlighters']
    },
    {
        id: "ite-14",
        name: "Backpacks",
        keywords: ['School suppl', 'Bookbags']
    },
    {
        id: "ite-15",
        name: "Sporting Goods",
        keywords: ['Toys', 'Games', 'Balls']
    },
    {
        id: "ite-16",
        name: "Educational Games",
        keywords: ['Toys']
    },
    {
        id: "ite-17",
        name: "Games",
        keywords: ['Toys']
    },
    {
        id: "ite-18",
        name: "Boardgames",
        keywords: ['Toys']
    },
    {
        id: "ite-19",
        name: "Toys",
        keywords: ['Dolls', 'Cars']
    },
    {
        id: "ite-20",
        name: "Comforters",
        keywords: ['Linens', 'Blankets']
    },
    {
        id: "ite-21",
        name: "Sheets",
        keywords: ['Linens', 'Blankets']
    },
    {
        id: "ite-22",
        name: "Towels",
        keywords: ['Linens', 'Bath Towels', 'Beach Towels']
    },
    {
        id: "ite-23",
        name: "Tablecloths",
        keywords: ['Linens', 'Table Cover']
    },
    {
        id: "ite-24",
        name: "Blankets",
        keywords: ['Linens', 'Bedsheets']
    },
    {
        id: "ite-25",
        name: "Shampoo/Conditioner",
        keywords: ['Hygiene', 'Bathroom Products', 'Sanitary Products']
    },
    {
        id: "ite-26",
        name: "Soap",
        keywords: ['Hygiene', 'Bathroom Products', 'Sanitary Products']
    },
    {
        id: "ite-27",
        name: "Pads/Tampons",
        keywords: ['Hygiene', 'Bathroom Products', 'Sanitary Products', "Women's Products"]
    },
    {
        id: "ite-28",
        name: "Diapers",
        keywords: ['Hygiene', 'Bathroom Products', 'Sanitary Products', "Baby"]
    },
    {
        id: "ite-29",
        name: "Dental Hygiene Products",
        keywords: ['Hygiene', 'Bathroom Products', 'Sanitary Products', "Toothbrushes", 'Toothpastes']
    },
    {
        id: "ite-30",
        name: "Deodorant",
        keywords: ['Hygiene', 'Bathroom Products', 'Sanitary Products']
    },
    {
        id: "ite-31",
        name: "Deodorant",
        keywords: ['Hygiene', 'Bathroom Products', 'Sanitary Products']
    },
    {
        id: "ite-32",
        name: "Toilet Paper",
        keywords: ['Hygiene', 'Bathroom Products', 'Sanitary Products']
    },
    {
        id: "ite-33",
        name: "First Aid Items",
        keywords: ['Hygiene', 'First-Aid', 'First Aid Kits', 'First-Aid Kits']
    },
    {
        id: "ite-34",
        name: "Furniture",
        keywords: ['Couch', 'Dresser', 'Nightstand', 'Chair', 'Table']
    },
    {
        id: "ite-35",
        name: "Canned Goods",
        keywords: ['Foods', 'Soup']
    },
];

const centers = [
    {
        id: "cen-1",
        name: "Shelters"
    },
    {
        id: "cen-2",
        name: "Underprivileged"
    },
    {
        id: "cen-3",
        name: "Homeless Shelters"
    },
    {
        id: "cen-4",
        name: "Orphanages"
    },
    {
        id: "cen-5",
        name: "Wellness Centers"
    },
];

export {
    items,
    centers,
}
