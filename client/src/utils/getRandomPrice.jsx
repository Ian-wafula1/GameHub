export default function getRandomPrice() {
    return ((Math.ceil(Math.random() * 4000)/100) + 20).toFixed(2);
}