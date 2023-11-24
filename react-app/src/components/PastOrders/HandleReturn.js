function HandleReturn({product}) {
    const handleReturn = (e) => {
        e.preventDefault();
    }
    return (
        <div>
            <p>We want to hear from you. We are sorry you didn't enjoy the {product.name}.</p>
            <label>
                Why are you returning this?
            <input type='text'/>
            </label>
            <button onClick={handleReturn}>Confirm Return </button>

        </div>
    )
}

export default HandleReturn
