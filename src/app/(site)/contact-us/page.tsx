"use client";

import { Button } from "@/components/ui/button";
import { H4, Small } from "@/components/typography";
import MyImage from "@/components/my-image";
import { useRouter } from "next/navigation";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt, FaWhatsapp, FaClock, FaShieldAlt, FaHeadset } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";

const ContactUs = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen ">
      {/* Top Section with Back Button */}
      <div className="border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="text-foreground hover:bg-primary/10"
            >
              <IoArrowBack className="h-6 w-6" />
            </Button>
            <H4>Contact Us</H4>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Hero Section */}
          <section className="text-center py-8 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 sm:mb-4">Get in Touch</h1>
            <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              Have questions? We&apos;re here to help. Reach out to us through any of the following channels.
            </p>
          </section>

          {/* Contact Image and Info Card */}
          <section>
            <div className="max-w-4xl mx-auto">
              <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
                {/* Image Section */}
                <div className="flex justify-center">
                  <div className="relative w-2xl aspect-video">
                    <MyImage
                      src="/images/contact-us.png"
                      alt="Contact Us"
                      fill
                      className="object-contain"
                      hasBaseUrl={false}
                    />
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Business Hours */}
                    <div className="bg-background rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="text-primary text-2xl">
                          <FaClock />
                        </div>
                        <h3 className="font-bold text-lg text-foreground">Business Hours</h3>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <Small className="text-muted-foreground block">Monday - Friday</Small>
                          <Small className="text-signature font-semibold block">9:00 AM - 6:00 PM</Small>
                        </div>
                        <div>
                          <Small className="text-muted-foreground block">Saturday</Small>
                          <Small className="text-signature font-semibold block">10:00 AM - 4:00 PM</Small>
                        </div>
                      </div>
                    </div>

                    {/* Our Promise */}
                    <div className="bg-background rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="text-primary text-2xl">
                          <FaShieldAlt />
                        </div>
                        <h3 className="font-bold text-lg text-foreground">Our Promise</h3>
                      </div>
                      <div className="space-y-2">
                        <Small className="text-muted-foreground block">100% Secure Shopping</Small>
                        <Small className="text-muted-foreground block">Easy Returns</Small>
                        <Small className="text-muted-foreground block">Quality Guarantee</Small>
                        <Small className="text-muted-foreground block">Fast Delivery</Small>
                      </div>
                    </div>

                    {/* Customer Support */}
                    <div className="bg-background rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="text-primary text-2xl">
                          <FaHeadset />
                        </div>
                        <h3 className="font-bold text-lg text-foreground">Customer Support</h3>
                      </div>
                      <div className="space-y-2">
                        <Small className="text-muted-foreground block">24/7 Support</Small>
                        <Small className="text-muted-foreground block">Quick Response</Small>
                        <Small className="text-muted-foreground block">Expert Assistance</Small>
                        <Small className="text-muted-foreground block">Satisfaction Guaranteed</Small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
              {/* Email Card */}
              <div className="bg-card p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-all">
                <div className="text-primary text-3xl mb-4">
                  <MdEmail />
                </div>
                <h3 className="font-bold text-lg mb-2 text-foreground">Email Us</h3>
                <Small className="text-muted-foreground block mb-1">You can send us email through</Small>
                <Small className="text-signature font-semibold block mb-2">ezaashop.official@gmail.com</Small>
                <Small className="text-muted-foreground block">Typically the support team responds within 2 hours</Small>
              </div>

              {/* Phone Card */}
              <div className="bg-card p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-all">
                <div className="text-primary text-3xl mb-4">
                  <FaPhoneAlt />
                </div>
                <h3 className="font-bold text-lg mb-2 text-foreground">Call Us</h3>
                <Small className="text-muted-foreground block mb-1">Contact us through our customer care number</Small>
                <Small className="text-signature font-semibold block mb-2">+92 334 5713086</Small>
                <Small className="text-muted-foreground block">Talk with our customer support executive at any time</Small>
              </div>

              {/* WhatsApp Card */}
              <div className="bg-card p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-all">
                <div className="text-primary text-3xl mb-4">
                  <FaWhatsapp />
                </div>
                <h3 className="font-bold text-lg mb-2 text-foreground">WhatsApp</h3>
                <Small className="text-muted-foreground block mb-1">Chat with us for quick responses</Small>
                <Small className="text-signature font-semibold block mb-2">+92 318 9974106</Small>
                <Small className="text-muted-foreground block">Get instant replies to your queries</Small>
              </div>
            </div>
          </section>

          {/* Action Buttons */}
          <section>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
              <Button
                variant="default"
                size="lg"
                className="flex-1 sm:flex-none sm:min-w-[200px] bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-6 rounded-lg transition-colors"
                onClick={() => window.location.href = 'mailto:ezaashop.official@gmail.com'}
              >
                <MdEmail className="h-5 w-5 mr-2" />
                <span>Send Email</span>
              </Button>
              <Button
                variant="default"
                size="lg"
                className="flex-1 sm:flex-none sm:min-w-[200px] bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-6 rounded-lg transition-colors"
                onClick={() => window.location.href = 'tel:+923345713086'}
              >
                <FaPhoneAlt className="h-5 w-5 mr-2" />
                <span>Call Us</span>
              </Button>
              <Button
                variant="default"
                size="lg"
                className="flex-1 sm:flex-none sm:min-w-[200px] bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-6 rounded-lg transition-colors"
                onClick={() => window.location.href = 'https://wa.me/923189974106'}
              >
                <FaWhatsapp className="h-5 w-5 mr-2" />
                <span>WhatsApp</span>
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ContactUs; 