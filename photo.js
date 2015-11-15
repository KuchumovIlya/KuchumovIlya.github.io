cur_small_shift = 0;
cur_big_shift = 0;
gallery_size = 3;
storage_size = 6;


function fix_gallery()
{
	for (var i = 0; i < gallery_size; i++)
	{
		var number = cur_small_shift + i;
		$("#small_image" + i).attr("src", "./load.gif");
		var img = $("<img " + "id=\"" + i + "\"" + "/>");
		img.load(function()
		{
			var cls = "#small_image" + $(this).attr("id");
			$(cls).attr("src", $(this).attr("src"));
		});
		img.attr("src", "./" + number + ".jpg");
	}
}


function is_good_small_shift()
{
	return 0 <= cur_small_shift && cur_small_shift + gallery_size <= storage_size;
}


function shift_gallery(dx)
{
	var old_shift = cur_small_shift;
	cur_small_shift += dx;
	if (!is_good_small_shift())
		cur_small_shift = old_shift;

	fix_gallery();
}


function parse_id(id)
{										
	return parseInt(id.substring("small_image".length));
}


function fix_big()
{
	$(".shadow_block").show();
	$(".big_wrap").show();

	$("#big_image").attr("src", "./load.gif");
	var img = $("<img />");
	img.load(function()
	{
		$("#big_image").attr("src", $(this).attr("src"));
	});
	img.attr("src", "./" + cur_big_shift + ".jpg");
}


function shift_big(dx)
{
	cur_big_shift += dx;
	if (cur_big_shift < 0)
		cur_big_shift = 0;
	if (cur_big_shift >= storage_size)
		cur_big_shift = storage_size - 1;

	fix_big();
}

function stop_big()
{
	$(".shadow_block").hide();
	$(".big_wrap").hide();
}


$(document).ready(function()
{
	stop_big();
	fix_gallery();

	$(".small_left_clicker").click(function()
	{
		shift_gallery(-1);
	});

	$(".small_right_clicker").click(function()
	{
		shift_gallery(1);
	});

	$(".small_image").click(function()
	{
		var id = parse_id($(this).attr("id"));
		cur_big_shift = id;
		fix_big();
	});

	$(".big_left_clicker").click(function()
	{
		shift_big(-1);
	});

	$(".big_right_clicker").click(function()
	{
		shift_big(1);
	});

	$(".big_stop_clicker").click(function()
	{
		stop_big();
	});
});