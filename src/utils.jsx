export default function formatCurrency(num){
    return "Kr. " + Number(num.toFixed(2)).toLocaleString() + " ";
}