$(document).ready(function(){
	var site = new todo();
	site.ready();
});

function todo(){
	var self = this;	
	
	this.ready = function(){
		self.get_data().then(function(data) {
            self.show_data(data);
        });	
	}
	
	this.get_data = function(){
        return new Promise(function(resolve, reject){
            $.ajax({
                type: 'GET',
                url: '/getList',
                error: function (err) {
                    console.log('error', err)
                },
                success: function (data) {  
                    resolve(data);
                }
            });
        });
    }

    this.show_data = function(data){
        console.log(data)
    }
}