module.exports = function (app)
{

        app.get('/reader', function(req, res)
        {
		ora_js.res = res;
		var url = 'http://cdn-api.ooyala.com/syndication/source?k=VteUEolbkp';
		
		ora_js.request.get(url, function (error, response, body) 
                {
                        if (!error && response.statusCode == 200) 
                        {
                                var parseString = require('xml2js').parseString;

				parseString(body, function (err, result) 
				{
					var d = result.rss['channel'][0]['item'];
					var len = Object.keys(d).length;
					//ora_js.ap = null;

					for(i=0;i<1;i++)
					{

						var params =
						{
							"Select": "ALL_ATTRIBUTES",
							"TableName": 'mrss_log',
							"KeyConditions":
							{
								"guid":
								{
									"AttributeValueList": [{"S":d[i]['guid'][0]._}],
									"ComparisonOperator": "EQ"
								},
							},
						}
						
						ora_js.dynamodb.query(params, function(err, data)
						{       
							if(data.Count == 0)
							{
								var ex = new Date().getTime();
								ex = ex.toString();	
							
								var params =
								{
									"Item":
									{
										"guid":{S:d[i]['guid'][0]._},
										"status":{S:"pending"},
										"show":{S:"OraLatino"},
										"title":{S:d[i]['title'][0]},
										"description":{S:d[i]['description'][0]},
										"thumbnail":{S:d[i]['media:thumbnail'][0].$.url},
										"pub_date":{S:d[i]['pubDate'][0]},
										"video":{S:d[i]['media:content'][0].$.url},
										"duration":{S:d[i]['media:content'][0].$.duration},		
									},
									TableName: 'mrss_log',
								};

								ora_js.dynamodb.putItem(params, function(err, data)
								{
									if(err)
									{
										console.log('err: '+err);
										res.json({"provision":"fail"});
									}
									else
									{
										res.json({"provision":"success"});
									}


								});

							}

						});  
					



					}
				});

                                        
                        }
                });


			/*
			for(var k in ora_js.item)
			{
				var params =
                                {
                                        "Select": "ALL_ATTRIBUTES",
                                        "TableName": 'mrss_log',
                                        "KeyConditions":
                                        {
                                                "guid":
                                                {
                                                        "AttributeValueList": [{"S":ora_js.item.guid}],
                                                        "ComparisonOperator": "EQ"
                                                },
                                        },
                                }
                                
                                ora_js.dynamodb.query(params, function(err, data)
                                {       
                                        if(data.Count == 0 && params.KeyConditions.guid.AttributeValueList[0].S == 'hkYTF0cTo4an4y64K3ZObwDb21VS1mrx')
                                        {
                                                console.log(ora_js.item);
                                        }
                                });	
		


			}
			*/	
			/*
			while (ora_js.item = stream.read()) 
			{
				var params =
                                {
                                        "Select": "ALL_ATTRIBUTES",
                                        "TableName": 'mrss_log',
                                        "KeyConditions":
                                        {
                                                "guid":
                                                {
                                                        "AttributeValueList": [{"S":ora_js.item.guid}],
                                                        "ComparisonOperator": "EQ"
                                                },
                                        },
                                }
				
                                ora_js.dynamodb.query(params, function(err, data)
                                {	
					if(data.Count == 0 && params.KeyConditions.guid.AttributeValueList[0].S == 'hkYTF0cTo4an4y64K3ZObwDb21VS1mrx')
					{
						console.log(params.rss);
					}
				});
				

					//console.log(item.title);
					//console.log(item.description);
					//console.log(item['media:thumbnail']['@'].url);
					//console.log(item.pubdate);
					//console.log(item['media:content']['@'].url);
					//console.log(item['media:content']['@'].duration);
					//console.log(item.guid);

			}
			*/


		/*
		ora_js.request.get('http://cdn-api.ooyala.com/syndication/source?k=VteUEolbkp', function (error, response, body) 
		{
    			if (!error && response.statusCode == 200) 
			{

				var parseString = require('xml2js').parseString;
var xml = "<root>Hello xml2js!</root>"
parseString(xml, function (err, result) {
    console.dir(result);
});
					
				 res.end(body);
			}
		});
		*/

        });

}
