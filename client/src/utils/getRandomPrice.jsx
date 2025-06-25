export default function getRandomPrice() {
    return (Math.ceil(Math.random() * 7000)/100).toFixed(2);
}