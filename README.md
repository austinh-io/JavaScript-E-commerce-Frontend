# Simple Ecommerce Frontend
This is a total overhaul and remake of a class project I did in 2021, which you can see [here](https://github.com/gmni-dev/Simple-Ecommerce-Frontend-2021). At this point it has surpassed the functionality of the original, however I am still working towards full functionality and improving the design of the site.

Some of you may see the irony in me calling this "simple" when it has more behavior included than what you might except for a simple ecommerce site with just a usable cart system. I described it as simple because it uses no libraries or frameworks. Just vanilla JS and its built-in APIs.

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
- Liberal usage of web components. Not actually sure if this is a feature, but it was interesting to learn how to implement and utilize.

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
