function ThunderCloud(img) 
{
    this.initialize(img);
}
//inheritance
ThunderCloud.prototype = new createjs.Bitmap();
ThunderCloud.prototype.CloudInit = ThunderCloud.prototype.initialize;

//props
ThunderCloud.prototype.hasFired = false;
ThunderCloud.prototype.height = 0;
ThunderCloud.prototype.width = 0;
ThunderCloud.prototype.cloud = new createjs.Bitmap();
ThunderCloud.prototype.temperature = 0;

//constructor
ThunderCloud.prototype.initialize = function(img) 
{
    this.CloudInit(img);
    //ThunderCloud.prototype.height = height;
    //ThunderCloud.prototype.width = width;
};

