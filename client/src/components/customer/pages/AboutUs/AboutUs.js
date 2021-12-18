import './about.css';
import fashion from '../../../../images/fashion.png';
import flex from '../../../../images/flex.png';
import sustain from '../../../../images/sustain.png';
import tag from '../../../../images/tag.png';
import clothing from '../../../../images/au.jpg';

const AboutUs = () => {
    return (
        <div class="about-container">
            <div class="container-fluid p-0 m-0">
                <div class="row p-0 m-0">
                    <div class="col col-12 col-sm-12 col-md-12 aboutUs p-0">
                        <div class="above-div">
                            <h2>About Us</h2>
                        </div>
                    </div>

                    <div class="col col-12 col-sm-12 col-md-6 align-items-center px-5 mt-5 mb-5">
                        <h3 class="font-weight-bold text-left ">
                        Hi, welcome to "skincare"!{' '}
                        </h3>

                        <p class="text-left">
                            <br></br>
                            What began as a small collection in a neighborhood shop has evolved into a full lifestyle line of skincare, lip care, bodycare, and fragrance sold all over the world. The sensoriality of our products—their textures and scents—sets them apart. But they’re also scientifically proven to work extremely well. It’s this combination of high efficacy and amazing sensations that we’re known for, and why those who know us love us. Lev says fresh creates products people don’t know they need—and then can’t live without. Our founders still work with the brand every day to fulfill their original dream of making beauty that performs and transforms.
                            We are building the future beauty company where everything we make starts with you. We create the products you tell us you wish existed. We believe in thoughtful design, and enabling conversation (which is where it all starts). But most of all, we believe that beauty is about having fun, wherever you are in your journey.
                        </p>
                    </div>

                    <div class="col col-12 col-sm-12 col-md-6 m-0 p-0 px-5 mt-5 mb-5">
                        <img src={clothing} class="img-fluid" alt="" />
                    </div>

                    <div class="media col-md-6 col-12 px-5 py-3 m-0 mb-5 ">
                        <img
                            class="align-self-start mr-3 img-thumbnail"
                            src={fashion}
                            alt="Generic placeholder"
                        />
                        <div class="media-body">
                            <h5 class="mt-0"> Freedom</h5>
                            <p>
                                Explore different categories, discover products,
                                and try new things from the largest
                                retailers.
                            </p>
                        </div>
                    </div>

                    <div class="media col-md-6 offset-md-4 col-12 px-5 py-3 m-0 mb-5">
                        <img
                            class="align-self-start mr-3 img-thumbnail"
                            src={flex}
                            alt="Generic placeholder"
                        />
                        <div class="media-body">
                            <h5 class="mt-0">Total Flexibility</h5>
                            <p>
                                Let's be real: your style, concern, and budget
                                change over time. Now, your skin care can too.
                            </p>
                        </div>
                    </div>

                    <div class="media col-md-6 col-12 px-5 py-3 m-0 mb-5 ">
                        <img
                            class="align-self-start mr-3 img-thumbnail"
                            src={tag}
                            alt="Generic placeholder"
                        />
                        <div class="media-body">
                            <h5 class="mt-0">Forget the Price Tag</h5>
                            <p>
                                Finally the solution to putting on everything you
                                want, no purchase necessary.
                            </p>
                        </div>
                    </div>

                    <div class="media col-md-6 offset-md-4 col-12 px-5 py-3 m-0 mb-5 ">
                        <img
                            class="align-self-start mr-3 img-thumbnail"
                            src={sustain}
                            alt="Generic placeholder"
                        />
                        <div class="media-body">
                            <h5 class="mt-0">Sustainable</h5>
                            <p>
                                Supports recycling and use of organic products.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
