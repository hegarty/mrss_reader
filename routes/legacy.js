module.exports = function (app)
{

        app.get('/legacy/:marker', function(req, res)
        {
		var marker = req.param('marker').toLowerCase();
	
		if(marker)
		{		
			var client = new pg.Client(ora_js.cn);
			client.on('drain', client.end.bind(client));
			client.connect();

			var q = 'SELECT aws_key'; 
			q += 	' FROM video_output_files';
			q +=	' WHERE finished = true';
			//q += 	' AND output_id < '+output_id;
			q += 	' AND output_id > '+marker;
			
			var qu = client.query(q,function(error,result)
			{
				ora_js.result = result;
				console.log(result);
				var total = (result.rowCount - 1);
				ora_js.i = 0;

				res.json({"status":"Logging "+result.rowCount+" exported videos greater than 'output_id': "+marker+" in the TABLE: 'video_output_files"});

				if(total>0)
				{
					var id = setInterval(function() 
					{
						console.log("From Interval:" + ora_js.i+" "+ora_js.result.rows[ora_js.i]["aws_key"]); 
						
						(function()
						{
							//ADD TABLES HERE AS NECESARY
							ora_js.log('US-EAST-1',ora_js.result.rows[ora_js.i]["aws_key"],null);
							ora_js.log('US-WEST-2',ora_js.result.rows[ora_js.i]["aws_key"],null);
						})();

			
						if(ora_js.i >= total)
						{
							clearInterval(id);
							console.log('DONE');
						}

						ora_js.i++;
					},100);
				}

			});
			/*
			ora_js.log = function(table,key,_status)
			{
				var params =
				{
						"Item":
						{
							"s3_key":{S:key},
							"status":{S:_status}
						},
					TableName: table,
				
				};

				ora_js.dynamodb.putItem(params, function(err, data)
				{
					if(err)
					{
						console.log('err: '+err);
					}
					else
					{
						console.log('DONE: '+JSON.stringify(data));
						//res.json({"status":"success"});

					}
				});
			}
			*/
		}		
	

		ora_js.get_last_video = function()
		{			
			/*
			var params =
			{
				if(start_key)
				{	
					ExclusiveStartKey:start_key,
					{
						"s3_key":
						{
							S:"newsbreaker/video-10001/mobile400.mp4"
						},
						"status":{"S":"complete"}
					},
				}	

				"TableName": 'US-EAST-1',
				"Limit":1
			}
			*/
			
			/*
			var params =
			{
				"Select": "ALL_ATTRIBUTES",
				"TableName":"US-EAST-1",
				"KeyConditions":
				{
					"show":
					{
						"AttributeValueList": [{"S":"newsbreaker"}],
						"ComparisonOperator": "EQ"
					},
				}
			}
			console.log('pull data');
			ora_js.dynamodb.query(params, function(err, data)
			{
				if(err)
				{
					console.log('query: '+err);
				}
				else
				{
					//return data.LastEvaluatedKey;
					
					//res.json({"status":"success",'data':data});
					
					var marker = (data.Count == 0)?"testinggg":"LAST_JSON_RECORD"; 
					ora_js.query_s3(marker);
				}	


			});
			*/
		}
	
		ora_js.query_s3 = function(marker)
		{
			/*
			var params = 
			{
				Bucket: 'oratv-videos', // required
				//Delimiter: 'oratv-videos/newsbreaker',
				//EncodingType: 'url',
				Marker: marker,
				MaxKeys: 1000,
				//Prefix: 'STRING_VALUE'
			};
			ora_js.s3.listObjects(params, function(err, data) 
			{
				if (err) 
				{
					console.log('ERROR:'+err, err.stack); // an error occurred
				}
				else
				{     
						
					//write to TABLE
					var body = JSON.stringify(data,null,"   ");
					res.setHeader('Content-Type', 'application/json');
					res.setHeader('Content-Length', body.length);
					res.end(body);
					//ora_js.get_last_video();
				}
			});
			*/

			/*
			var params =
                        {
                                Bucket: 'oratv-videos', // required
                                //Key: 'wtfark/video-12667/thumbs/00009.jpg',
                                //EncodingType: 'url',
                                //Marker: marker,
                                //MaxKeys: 1000,
                                //Prefix: 'STRING_VALUE'
                        };
                        ora_js.s3.getBucketLogging(params, function(err, data)
                        {
                                if (err)
                                {
                                        console.log('ERROR:'+err, err.stack); // an error occurred
                                }
                                else
                                {

                                        //write to TABLE
                                        var body = JSON.stringify(data,null,"   ");
                                        res.setHeader('Content-Type', 'application/json');
                                        res.setHeader('Content-Length', body.length);
                                        res.end(body);
                                        //ora_js.get_last_video();
                                }
                        });
			*/
		}
		
		//res.json({"status":"success"});
	});
}
