import React from 'react';

class Review extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lang: props.lang,
            item: props.item,
            stars: [0,0,0,0,0]
		};
	}

    render(){
        let lang = this.props.lang;
        let rating = this.props.item.Rating;
        let rating_number = this.props.item.Rating_number;
        return (
            <div className="review_container">
                <div className="review_stars">
                    {
                        this.state.stars.map(function(x, i){
                            if(i>=rating){
                                return <div key={i} className="review_star"><i className="fa fa-star-o" aria-hidden="true"></i></div>
                            } else {                                
                                if(rating-i === 0.5){
                                    return <div key={i} className="review_star"><i className="fa fa-star-half-o" aria-hidden="true"></i></div>
                                } else {
                                    return <div key={i} className="review_star"><i className="fa fa-star" aria-hidden="true"></i></div>
                                }
                            }
                        })
                    }  
                </div>
                <div  className="review_number">
                    {lang === "ro" ? <p>{rating_number} review-uri</p> : <p>{rating_number} reviews</p>}                    
                </div>
            </div>
        );
    };
}

export default Review;