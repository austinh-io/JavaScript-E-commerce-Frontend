# Simple Ecommerce Frontend
This is a total overhaul and remake of a class project I did in 2021, which you can see [here](https://github.com/gmni-dev/Simple-Ecommerce-Frontend-2021). At this point it has surpassed the functionality of the original, however I am still working towards full functionality and improving the design of the site.

I'm sure some of you may see the irony in me calling this "simple" when it has more behavior included than what you might except for a simple cart system, however I refer to it as simple because it is using no libraries or frameworks, and it is simplistic in that sense.

## No Images or Video
I have not uploaded any of the assets to the repository. This is because a lot of them are stock, and I don't have permission to bundle them, and I'm afraid that may count as redistributing without permission. So if you try this project for yourself, you won't have any images or video. The site should still function perfectly fine without those files. I did keep fonts and icons included.

## Custom Icons with JSymbol
I utilize a custom built system for icons, too. I called it "JSymbol". I haven't made any of the icons myself, however. I am using icons from [Iconoir](https://iconoir.com) for now.

JSymbol is more flexible than what I was using before, which was just using an icon font library from Google Material Icons. I don't know if this performs any better or worse than a typical icon font library. The name probably isn't very original, but I did manage to snag jsymbol.com in case I ever make something bigger from it. I think the name works well though, as it's a system for symbols/icons to use in JS.

## Product Data Structure Guidelines

This section is more for myself, as the way I have my product data structured it needs to follow certain rules to work correctly, and I don't believe there is a way to enforce this right now, as every product is currently manually added to the JSON file.

1. Products are "containers" for Options
2. Options are unique items, categorized by similar traits defined by the Product.
3. An Option should be something that would be physically seperate from another object if it existed physically. For instance, if I had a pile of the same shirts, but they came in different sizes. All those shirts would belong as the same Product, but each one is an Option, defined by its size, and thus are uniquely their own shirt in physical space.
4. Every single Option of a Product should all contain the same number of Attributes, all with the same Name and Type. Values can be different.
5. If an Option needs a different set of Attributes, then it should be in a different Product.
