ora_js.update_log = function(table,key,_status)
{
        var params =
        {
		"Key":
		{
			"s3_key":{S:key},
			"status":{S:'pending'}
		},
                TableName: table,

        };

        ora_js.dynamodb.deleteItem(params, function(err, data)
        {
                if(err)
                {
                        console.log('err: '+err);
                }
                else
                {
			ora_js.log('US-WEST-2',params.Key.s3_key.S,'complete');
                        //console.log('DONE: '+JSON.stringify(data));
                        //res.json({"status":"success"});

                }
        });
}



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
			//console.log('DONE: '+JSON.stringify(data));
			//res.json({"status":"success"});

		}
	});
}
