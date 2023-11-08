# Simple Ecommerce Frontend

This is a mockup of an ecommerce site, done purely in JS, CSS, and HTML. Since this is only a front end project, I have a mockup set of data in a JSON file, and a lot of behavior that would typically be handled by a server is coded just as plain JavaScript that runs on the client.

It has a basic home page, catalog for browsing products, a product page, and a checkout page.

My first attempt at this was as a class project in 2021 (which you can see [here](https://github.com/gmni-dev/Simple-Ecommerce-Frontend-2021)). I wasn't happy with how it turned out, so this is a total remake of that older project. Another part of this inspiration was when I had to make an ecommerce site in both React and Angular as part of another college course, however I was disapointed with how I made those, too. Part of me feels as though I didn't know enough basic JavaScript to really understand a framework or library yet, so my main goal for this project was to get myself familar enough that I would be more comfortable working in a framework or library.

[Demo](https://projects.gmni.dev/simple-ecom/)

## Features

### Currently implemented features:
- Programatic generating of products in catalog from data in JSON file
- Adding and removing items to/from your cart
- Adding/removing specific options to/from cart
- Cart keeps total count of items, total cost of each item, and subtotal of cart
- Cart persists between sessions
- Selections of variety of options of a product (color, size, material, etc.)
- Dynamic generation of selections based on data defined in JSON file
- Dark/Light mode themes and toggle 
- Prefered light/dark mode theme detection
- Product page that shows selected product based on URL parameters
- Responsive design implemented for the following:
  - Catalog page
  - Product page
  - Navigation menu
  - Cart menu
- Demonstrates use of web components and interaction between the DOM, shadow DOM, and other web components
- Very basic implementation of lazy-loading for images

### Planned features:
- Carousel for product images
- Finished checkout page
- Mockup checkout system
- Unqiue price change events (on sale, clearance, etc.)
- More pages (About Us, Categories, etc.)
- Product filtering
- Promo code discounts
- Sorting catalog by price, name, brand, sale, and more

## No Images or Video?
No assets have been uploaded to the repository. This is because a lot of them are licensed, and I don't have permission to distribute them. I'm afraid that including them in my repository may count as redistributing without permission. So if you try this project for yourself, you won't have any images or video. The site should still function perfectly fine without those files. I did keep fonts and icons included.

Custom images and assets are planned for the future, so stay tuned for when that happens.

## Custom Icon System called JSymbol
I built a custom system for icons called JSymbol. I haven't made any of the icons myself though, right now they are from [Iconoir](https://iconoir.com).

This may not be more effect than something like Google Material Icons or Fontawesome, but it was interesting to learn and build. I haven't tested if this performs any better or worse than a typical icon font library. The name probably isn't very original either, but I did manage to snag jsymbol.com in case I ever make something bigger from it. I think the name works well though, as it's a system for symbols/icons to use in JS.

## Product Data Structure Guidelines

This section is more for myself, as the way I have my product data structured it needs to follow certain rules to work correctly, and I don't believe there is a way to enforce this right now, as every product is currently manually added to the JSON file.

1. Products are "containers" for Options
2. Options are unique items, categorized by similar traits defined by the Product.
3. An Option should be something that would be physically seperate from another object if it existed physically. For instance, if I had a pile of the same shirts, but they came in different sizes. All those shirts would belong as the same Product, but each one is an Option, defined by its size, and thus are uniquely their own shirt in physical space.
4. Every single Option of a Product should all contain the same number of Attributes, all with the same Name and Type. Values can be different.
5. If an Option needs a different set of Attributes, then it should be in a different Product.
