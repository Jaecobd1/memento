const Card = ({ image, selected, onClick }) => {
    return (
        <div className="card">
            <div className={selected && 'selected'}>
                <img alt="" src={image} className="card-face"/>

                <img
                    alt=""
                />
                <img
                    src={'/assets/fireship.png'}
                    alt=""
                    className="card-back"
                    onClick={onClick}
                />
            </div>
                
        </div>
    );
};

export default Card;