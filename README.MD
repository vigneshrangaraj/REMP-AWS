# Real Estate Market Pricing Application

### Proposal and Motivation

In the past, there was an application developed with prediction of property price based on several conditions: like pool area, number of rooms, bedrooms etc. and along with the area that the property was located in. We derived a proper algorithmic determination supported by linear regression housed on Tensor Flow Analysis to ballpark a number on a property for either a realtor or a buyer with pre-defined conditions pertaining to the property in question. Although the application ran to its successful implementation and we were able to derive at a number if we had all the inputs, the server was hosted on the student’s laptop and the iOS application server was running from xCode. There was no situational awareness as to where the property was or how complications and dynamics of the neighborhood affected the pricing of the real-estate enterprise.
This project, with the detailed implications of hosting such an application on a local server in mind, hopes to host the application on Cloud with additional built-in tools like situational awareness and situational intelligence for better assisting the consumer needs with seller’s intention in mind. The application would host the engine for leaflet data services with the raw data housed on Redis database hoping that cached solutions could better assist with machine learning intentions of the dynamic algorithms. The project hopes to address issues with security with the learning for the student focused on file storage and cache-based data loading for offline loading purposes such as service workers. The student hopes to house the front-end of such an application on Angular with the focus turning to learning the best practices of cloud computing.
In addition to this, the focus would therefore, solely rely on cloud computation on AWS with DocumentDB database cache-storage. Such a setup was chosen due to the computational focus of the course which not only relies on the usage of the said software but also on the architectural needs of hosting a simple application on Cloud.

### Script to install the app

The entire application is containarized for the following reasons:

* Anybody can run the app with ease
* Minimal efforts to install
* Can be run on any environment

#### Pull the image

```shell script
 docker pull vigneshrangaraj/remp2021:latest
```

The image pulls the docker image from a public repository I built. Once the image is pulled, you
can check if the image exists by running the following command:

```shell script
docker images
```

The container should be listed there. From here, all that needs to be done is `docker run`. See the following
command:

```shell script
docker run --publish 8082:8080 vigneshrangaraj/remp2021
```

The above command binds the internal port from the container `8080` to the your local machine on your computer: `8082`.
After this, wait until the application finished running, i.e. allow some time for the model to finish building.

### Useful links

#### Github link:

```url
https://github.com/vigneshrangaraj/REMP-AWS
```

#### Public Docker Hub Repository

```url
https://hub.docker.com/repository/docker/vigneshrangaraj/remp2021
```

#### The APP running on AWS

```url
http://remp-alb-1861535656.us-east-2.elb.amazonaws.com/
```
