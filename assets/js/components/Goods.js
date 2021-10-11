// ./assets/js/components/goods.js
    
import React, {Component} from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
    
class Goods extends Component {
    /**
	 * @param {any} props
	 */
    constructor(props) {
        super(props);
        this.state = { goods: [], loading: true};
    }
    
    componentDidMount() {
        this.getGoods(null, null);
    }
    /**
	 * @param {{ location: string; }} prevProps
	 */
    componentDidUpdate(prevProps){
		console.log(this.props.location.search);
		console.log(this.props);
		console.log(prevProps);
		if (this.props.location.search !== prevProps.location.search) {
			console.log('unequals');
			this.getUriParam();
		}else{
			console.log('equals');
		}
	}
	getUriParam(){
		const uri = this.props.location.search;
		const arr = uri.split("=");
		let key = arr[0];
		const value = arr[1];
		console.log(arr);
		key = key.replace('?','');
		console.log("key: " + key);
		console.log("value: " + value);
		this.getGoods(key, value)
		//?cat=woman_watches
	}
    /**
	 * @param {any} key
	 * @param {any} value
	 */
    getGoods(key, value) {
		//let key = 'cat';
       axios.get('/api/goods', {
			params: {
			[key]: value
		}
		}).then(goods => {
           this.setState({ goods: goods.data, loading: false})
       })
    }
    
    render() {
        const loading = this.state.loading;
        return(
            <div>
                <section className="product spad" >
					<div className="">
                        {loading ? (
                            <div className={'row text-center'}>
                                <span className="fa fa-spin fa-spinner fa-4x"></span>
                            </div>
                        ) : (
                            <div className={'row'}>
                                { this.state.goods.map((good, index) =>
									<a key={index} className="col-lg-4  mix good-item" href={'/' + good.goods_translit}>
										<div >
											<div className="product__item ">
												<div className="product__item__pic set-bg" style={{backgroundImage: `url(${"img/" + good.img})`}} >
												<div className="price">{good.price}</div>
												</div>
												<div className="product__item__text text-center">
													<h6>{good.name}</h6>
												</div>
											</div>
										</div>
									</a>
                                )}
                            </div>
                        )}
                    </div>
                </section>
            </div>
        )
    }
}
export default withRouter(Goods);
