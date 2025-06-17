import Container from "@/components/container";
import TeamMemberCard from "@/components/team-member-card";

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Hameed Afridi",
      role: "Chairman",
      bio: "Serial entrepreneur with 10+ years in e-commerce and digital marketing.",
      image: "/images/team/chairman.png"
    },
    {
      name: "Aiman Hameed",
      role: "CEO",
      bio: "Technology expert specializing in scalable e-commerce platforms.",
      image: "/images/team/ceo.png"
    },
  ];

  return (
    <Container title="About Us">
      <div className="space-y-8 sm:space-y-12">
        {/* Hero Section */}
        <section className="text-center py-8 sm:py-12 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 sm:mb-4">Online Shopping</h1>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">Ezaashop is an innovative e-commerce platform designed to bring you a unique shopping experience with unbeatable benefits. We provide a wide range of products with the added advantage of a cashback system that allows you to save more on every purchase. Our cashback has no limits – the more you shop, the more you earn. Plus, we offer a robust referral system, allowing you to earn even more by inviting your friends and family.</p>
          </section>

        {/* Our Story */}
        <section className="px-4 sm:px-0">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 border-b border-border pb-2">Our Story</h2>
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            <div>
              <p className="text-base sm:text-lg leading-relaxed mb-4 text-muted-foreground">
                Founded in 2023, Ezaashop began with a simple idea: what if shopping online could actually pay you back? 
                We built a platform where every purchase earns you cashback, and every referral grows your rewards.
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                Today, we serve thousands of happy customers across the country, helping them save money while enjoying 
                a seamless shopping experience.
              </p>
            </div>
            <div className="bg-card rounded-lg p-4 sm:p-6 border border-border">
              <h3 className="font-semibold text-lg mb-3 text-foreground">Quick Facts</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">✓</span>
                  <span className="text-muted-foreground">10,000+ satisfied customers</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">✓</span>
                  <span className="text-muted-foreground">5M+ in cashback distributed</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">✓</span>
                  <span className="text-muted-foreground">500+ trusted brands</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="px-4 sm:px-0">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 border-b border-border pb-2">Why Choose Ezaashop?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-card p-4 sm:p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-all">
              <div className="text-primary text-2xl sm:text-3xl mb-3">💰</div>
              <h3 className="font-bold mb-2 text-foreground">Unlimited Cashback</h3>
              <p className="text-muted-foreground text-sm sm:text-base">Earn cashback on every purchase with no upper limits.</p>
            </div>
            <div className="bg-card p-4 sm:p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-all">
              <div className="text-primary text-2xl sm:text-3xl mb-3">👥</div>
              <h3 className="font-bold mb-2 text-foreground">Referral Rewards</h3>
              <p className="text-muted-foreground text-sm sm:text-base">Earn commission when your friends shop.</p>
            </div>
            <div className="bg-card p-4 sm:p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-all">
              <div className="text-primary text-2xl sm:text-3xl mb-3">🛡️</div>
              <h3 className="font-bold mb-2 text-foreground">Secure Payments</h3>
              <p className="text-muted-foreground text-sm sm:text-base">100% secure transactions.</p>
            </div>
            <div className="bg-card p-4 sm:p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-all">
              <div className="text-primary text-2xl sm:text-3xl mb-3">🚚</div>
              <h3 className="font-bold mb-2 text-foreground">Fast Delivery</h3>
              <p className="text-muted-foreground text-sm sm:text-base">2-3 day delivery across major cities.</p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="px-4 sm:px-0">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 border-b border-border pb-2">Meet Our Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {teamMembers.map((member, index) => (
              <TeamMemberCard 
                key={index}
                name={member.name}
                role={member.role}
                bio={member.bio}
                image={member.image}
              />
            ))}
          </div>
        </section>

        {/* Values Section */}
        <section className="px-4 sm:px-0">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 border-b border-border pb-2">Our Core Values</h2>
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-start">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <span className="text-primary font-bold">1</span>
              </div>
              <div>
                <h3 className="font-bold text-base sm:text-lg mb-1 text-foreground">Customer First</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Every decision we make starts with what's best for our customers.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <span className="text-primary font-bold">2</span>
              </div>
              <div>
                <h3 className="font-bold text-base sm:text-lg mb-1 text-foreground">Transparency</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  No hidden terms or conditions - just honest rewards and savings.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <span className="text-primary font-bold">3</span>
              </div>
              <div>
                <h3 className="font-bold text-base sm:text-lg mb-1 text-foreground">Innovation</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Constantly evolving to bring you better ways to save and earn.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary/5 rounded-lg p-6 sm:p-8 text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-foreground">Ready to Start Saving?</h2>
          <p className="text-base sm:text-lg mb-6 max-w-2xl mx-auto text-muted-foreground">
            Join thousands of smart shoppers who are already earning cashback on every purchase.
          </p>
          {/* <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors">
            Sign Up Now
          </button> */}
        </section>
      </div>
    </Container>
  );
};

export default AboutPage;
// import Container from "@/components/container";

// const AboutPage = () => {
//   return (
//     <Container title="About Us">
//       <div className="space-y-4 text-base leading-relaxed">
//         <p>
//           Welcome to <strong>Ezaashop</strong> – your one-stop destination for smarter online shopping. At Ezaashop, we believe shopping should be rewarding, convenient, and accessible for everyone.
//         </p>
//         <h2 className="text-lg font-semibold">Who We Are</h2>
//         <p>
//           Ezaashop is an innovative e-commerce platform designed to bring you a unique shopping experience with unbeatable benefits. We provide a wide range of products with the added advantage of a cashback system that allows you to save more on every purchase. Our cashback has no limits – the more you shop, the more you earn. Plus, we offer a robust referral system, allowing you to earn even more by inviting your friends and family.
//         </p>
//         <h2 className="text-lg font-semibold">Our Unique Features</h2>
//         <ul className="list-disc list-inside">
//           <li><strong>Unlimited Cashback:</strong> Earn cashback on every purchase without any limits.</li>
//           <li><strong>Referral Rewards:</strong> Invite your friends and earn commission when they shop.</li>
//           <li><strong>Cash on Delivery (COD):</strong> Shop with confidence and pay only when your order is delivered.</li>
//           <li><strong>Secure Shopping:</strong> Your privacy and data security are our top priorities.</li>
//         </ul>
//         <h2 className="text-lg font-semibold">Our Vision</h2>
//         <p>
//           To make online shopping more rewarding, transparent, and accessible for everyone.
//         </p>
//         <h2 className="text-lg font-semibold">Our Mission</h2>
//         <p>
//           To empower customers with a platform that not only offers a wide variety of products but also provides a meaningful way to save and earn.
//         </p>
//         <p>Thank you for choosing Ezaashop – where shopping meets savings.</p>
//       </div>
//     </Container>
//   );
// };

// export default AboutPage;
