
const products = [
    {
        
        name: "Airpods",
        image: require("../../assets/images/airpods.jpg"),
        description:
            "Experience the freedom of wireless audio with AirPods - the ultimate earbuds for Apple lovers. With the W1 chip, you'll get unparalleled connectivity and ease of use, while the crystal- clear sound quality will leave you in awe.Plus, the sleek and stylish design is the perfect match for any outfit.Upgrade your listening game today with AirPods.",
        brand: "Apple",
        category: "Electronics",
        price: 159,
        countInStock: 10,
        rating: 4.5,
        numReviews: 24,
    },
    {
        name: "Airtags",
        image: require("../../assets/images/airtag.jpg"),
        description:
            "Never lose your valuables again. Precision tracking with Find My app, easy setup, and sleek design. Attach to anything and have peace of mind.Protect your belongings and give yourself peace of mind with AirTags today.",
        brand: "Apple",
        category: "Electronics",
        price: 29,
        countInStock: 0,
        rating: 4.2,
        numReviews: 71,
    },
    {
        name: "Polishing Cloth",
        image: require("../../assets/images/cloth.jpg"),
        description:
            "The ultimate cleaning solution for your Apple devices. Don't let smudges and fingerprints tarnish the sleek appearance of your beloved devices. This reusable and washable cloth is made with a high-performance microfiber material that gently and effectively removes dirt, grime, and stains. Keep your devices looking pristine and invest in the Apple Cloth today.",
        brand: "Apple",
        category: "Accessory",
        price: 256,
        countInStock: 3,
        rating: 2.2,
        numReviews: 109,
    },
    {
        name: "iMac",
        image: require("../../assets/images/desktop.jpg"),
        description:
            "Experience the ultimate all-in-one desktop with the iMac from Apple. With stunning Retina displays, powerful processors, and innovative features like FaceTime HD camera, you can work and play like never before. The sleek design will complement any workspace, and the macOS operating system delivers a seamless user experience. Invest in the iMac today and take your computing to the next level.",
        brand: "Apple",
        category: "Electronics",
        price: 1799,
        countInStock: 10,
        rating: 4.1,
        numReviews: 819,
    },
    {
        name: "HomePod",
        image: require("../../assets/images/homepod.jpg"),
        description:
            "Get ready to experience immersive sound like never before with HomePod from Apple. With Siri built-in, you can control your music, get information, and more with just your voice. The compact and stylish design will complement any room, and the seamless integration with other Apple devices makes HomePod a must-have accessory for any Apple fan.",
        brand: "Apple",
        category: "Electronics",
        price: 299,
        countInStock: 10,
        rating: 4.1,
        numReviews: 1419,
    },
    {
        name: "MacBook Pro",
        image: require("../../assets/images/mac.jpg"),
        description:
            "Get ready to tackle any task with the ultimate tool for creators and professionals - the MacBook Pro from Apple. With powerful processors, stunning Retina displays, and macOS operating system, you'll experience seamless productivity like never before. The sleek and portable design makes it perfect for work on-the-go. Invest in the MacBook Pro today and take your productivity to the next level.",
        brand: "Apple",
        category: "Electronics",
        price: 2435,
        countInStock: 110,
        rating: 4.8,
        numReviews: 11519,
    },
    {
        name: "Magic Mouse",
        image: require("../../assets/images/mouse.jpg"),
        description:
            "Experience precision and comfort like never before with the Magic Mouse from Apple. With an ergonomic design and smooth multi-touch surface, you can navigate with ease and efficiency. The seamless integration with macOS and Bluetooth connectivity make it a must-have accessory for any Apple fan. Upgrade your productivity with the Magic Mouse today.",
        brand: "Apple",
        category: "Electronics",
        price: 102,
        countInStock: 10,
        rating: 3.1,
        numReviews: 738,
    },
    {
        name: "iPad Pro",
        image: require("../../assets/images/pad.jpg"),
        description:
            "The iPad Pro from Apple is a true game-changer in the world of tablets. With stunning Liquid Retina displays, powerful processors, and incredible versatility, it's perfect for work, play, and everything in between. The sleek and portable design makes it easy to take on-the-go, and the Apple Pencil and Magic Keyboard make it even more versatile. Get ready to take your productivity and creativity to the next level with the iPad Pro.",
        brand: "Apple",
        category: "Electronics",
        price: 2399,
        countInStock: 910,
        rating: 4.7,
        numReviews: 71938,
    },
    {
        name: "Apple Pencil",
        image: require("../../assets/images/pencil.jpg"),
        description:
            "Unleash your inner creativity with the Apple Pencil - the ultimate tool for digital artists and designers. With unparalleled precision and accuracy, you can bring your ideas to life in a way that's never been possible before. Whether you're sketching, drawing, or writing notes, the Apple Pencil feels natural and intuitive in your hand. Upgrade your creativity game with the Apple Pencil today.",
        brand: "Apple",
        category: "Electronics",
        price: 129,
        countInStock: 189,
        rating: 3.8,
        numReviews: 29101,
    },
    {
        name: "iPhone 14 Pro",
        image: require("../../assets/images/phone.jpg"),
        description:
            "The iPhone is the ultimate combination of sleek design and cutting-edge technology. With its stunning Retina display, powerful A-series chip, and intuitive user interface, it's the perfect device for staying connected, capturing memories, and enjoying the best of Apple's ecosystem. Upgrade your mobile experience with the iPhone today.",
        brand: "Apple",
        category: "Electronics",
        price: 1740,
        countInStock: 1889,
        rating: 4.3,
        numReviews: 192819,
    },
    {
        name: "MagSafe Battery",
        image: require("../../assets/images/powerbank.jpg"),
        description:
            "Stay charged on the go with the MagSafe Battery Pack - the perfect accessory for the latest iPhones. With its sleek design and magnetic attachment, it provides reliable wireless charging without the hassle of cables. And with up to 15W of charging power, you can quickly top up your battery whenever you need to. Keep your iPhone powered up and ready for anything with the MagSafe Battery Pack.",
        brand: "Apple",
        category: "Electronics",
        price: 148,
        countInStock: 2089,
        rating: 3.9,
        numReviews: 12012,
    },
    {
        name: "Apple TV 4K",
        image: require("../../assets/images/tv.jpg"),
        description:
            "Experience your favorite shows, movies, and games like never before with Apple TV 4K. With stunning 4K HDR visuals, immersive sound, and a powerful A10X Fusion chip, it delivers the ultimate viewing experience. And with access to all your favorite streaming services and the App Store, there's no shortage of content to choose from. Upgrade your home entertainment system with Apple TV 4K today.",
        brand: "Apple",
        category: "Electronics",
        price: 181,
        countInStock: 7081,
        rating: 3.2,
        numReviews: 9729,
    },
    {
        name: "Apple Watch Ultra",
        image: require("../../assets/images/watch.jpg"),
        description:
            "Experience the ultimate blend of style and functionality with the Apple Watch. From monitoring your health and fitness to staying connected with loved ones, the Apple Watch Ultra has got you covered. With its sleek and durable design, you can wear it anywhere and everywhere. Make a statement and stay on top of your game with the Apple Watch Ultra.",
        brand: "Apple",
        category: "Electronics",
        price: 1200,
        countInStock: 1241,
        rating: 4.7,
        numReviews: 62219,
    },
];

export default products;
