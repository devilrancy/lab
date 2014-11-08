app.filter('formatDate', function(){
    return function( date ) {
    	stringDate = new Date( date );
        return stringDate.toDateString();
    };
});


app.filter('trusted', function ($sce, $sanitize) {
    return function (text) {
        var regex = /href="([\S]+)"/g;
        var newString = $sanitize(text).replace(regex, "onClick=\"window.open('$1', '_blank', 'location=no,enableViewportScale=yes')\"");
        return $sce.trustAsHtml(newString);
    }
});

app.filter('allow_html', function ($sce) {
    return function (text) {
        var regex = /href="([\S]+)"/g;
        var newString = text.replace(regex, "onClick=\"window.open('$1', '_blank', 'location=no,enableViewportScale=yes')\"");
        return $sce.trustAsHtml(newString);
    }
});

app.filter('trust', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
});

app.filter('striptags', function($sce, $sanitize){
    return function(text) {
    	var StrippedString = $sanitize(text).replace(/<\/?[^>]+(>|$)/g, "");
        return $sce.trustAsHtml(StrippedString);
    };
});


app.filter('hasFeatured', function() {

   return function( items ) {

    var filtered = [];

    angular.forEach(items, function(item) {
       if( condition === item.featured_image.attachment_meta.sizes.medium.url ||  item.condition === '' ){
         filtered.push(item);
       }
    });

    return filtered;
  };
});
