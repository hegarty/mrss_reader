module.exports = function (app)
{

	/*
		migrate/:key moves s3 objects to alternate s3 nodes
		Process is signaled by api.ora.tv (OraApi/transcoding.php) when object is marked as 'finished' line:192

	*/

        app.get('/migrate/:key', function(req, res)
        {
		var s3key = req.param('key').toLowerCase();
		s3key = s3key.replace(/_/g,"/");

		console.log("Processing: "+s3key);
		res.end();
	
		ora_js.log('US-EAST-1',s3key,'complete');
		ora_js.log('US-WEST-2',s3key,'pending');

		var params = 
		{
			Bucket: 'oratv-videos-us-west-2', // required
			Key:s3key,
			CopySource: 'oratv-videos/'+s3key, // required
			ACL: 'public-read',
		};
		
		ora_js.usw.copyObject(params, function(err, data) 
		{
			if (err) 
			{
				console.log(this.httpRequest.endpoint, err.stack); // an error occurred
			}
			else
			{
				ora_js.update_log('US-WEST-2',s3key,'complete');
				console.log('Transfered: '+params.Bucket+'/'+params.Key);
			}
		});

		



	});

}
