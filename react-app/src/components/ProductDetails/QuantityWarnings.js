export function MinimumAdd() {
    return (
        <h2>You must purchase at least one item. Please try again.</h2>
    )
}

export function LowStock({product}) {
    return (
        <h2>Item is low on stock. You cannot purchase more than {product.available} items. Please try again.
        </h2>
    )
}
