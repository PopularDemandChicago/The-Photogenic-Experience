import ContactForm from "./ContactForm";



export default function Contact() {

  return (

    <section id="contact" className="section-padding section-light">

      <div className="mx-auto max-w-7xl">

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">

          <div>

            <p className="section-eyebrow !justify-start">Get In Touch</p>

            <h2 className="luxury-heading mb-6">

              Let&apos;s Create

              <span className="silver-gradient-text block italic">

                Something Beautiful

              </span>

            </h2>

            <p className="body-copy mb-10">

              Choose Digital or Pro Photo Booth, share your event details, and

              we&apos;ll check availability with pricing tailored to your

              celebration.

            </p>



            <div className="accent-border-left space-y-8">

              <div>

                <p className="luxury-label">Email</p>

                <a

                  href="mailto:hello@thephotogenicexperience.com"

                  className="text-lg font-light text-luxury-black transition-colors hover:text-neutral-600"

                >

                  hello@thephotogenicexperience.com

                </a>

              </div>

              <div>

                <p className="luxury-label">Phone</p>

                <a

                  href="tel:+17736398099"

                  className="text-lg font-light text-luxury-black transition-colors hover:text-neutral-600"

                >

                  (773) 639-8099

                </a>

              </div>

              <div>

                <p className="luxury-label">Service Area</p>

                <p className="text-lg font-light text-luxury-black">

                  Serving Chicago, IL &amp; surrounding suburbs

                </p>

              </div>

            </div>

          </div>



          <div className="glass-panel">

            <ContactForm />

          </div>

        </div>

      </div>

    </section>

  );

}


