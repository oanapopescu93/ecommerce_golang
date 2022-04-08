import React from 'react';
import { setCookie } from '../utils';

class Language extends React.Component {
	constructor(props) {
		super(props);
        this.state = {
			lang_change: props.lang_change,
	  	};
        this.click_lang = this.click_lang.bind(this);     
	}
    
    click_lang(lang){
        switch (lang) {
            case 'eng':
                setCookie("app_lang", "eng", 30);
                this.state.lang_change('eng');
                break;
            case 'ro':
                setCookie("app_lang", "ro", 30);
                this.state.lang_change('ro');
                break;	
            default:
                setCookie("app_lang", "eng", 30);
                this.state.lang_change('eng');
                break;				
          }          
    }

    render(){
        return (
            <div id="language_container">
                <div className="language_box" onClick={()=>this.click_lang('eng')}>
                    <span>ENG</span>
                </div>
                <div className="language_box" onClick={()=>this.click_lang('ro')}>
                    <span>RO</span>
                </div>                
            </div>
        );
    };
}

export default Language;