import Link from "next/link";



const footerLinks = [

  { href: "#services", label: "Services" },

  { href: "#gallery", label: "Gallery" },

  { href: "#experience", label: "Experience" },

  { href: "#contact", label: "Contact" },

];



export default function Footer() {

  return (

    <footer className="section-dark border-t border-white/[0.06]">

      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 lg:px-20">

        <div className="grid gap-12 md:grid-cols-3">

          <div>

            <Link href="/" className="group mb-6 inline-flex flex-col">

              <span className="font-display text-xl font-light tracking-[0.12em] text-white">

                THE PHOTOGENIC

              </span>

              <span className="text-[10px] uppercase tracking-[0.35em] text-luxury-silver">

                Experience

              </span>

            </Link>

            <p className="text-sm font-light leading-relaxed text-luxury-platinum/50">

              Premium digital photo booth rentals for weddings, corporate events,

              and private celebrations throughout Chicagoland.

            </p>

          </div>



          <div>

            <p className="luxury-label mb-4">Navigation</p>

            <ul className="space-y-3">

              {footerLinks.map((link) => (

                <li key={link.href}>

                  <Link

                    href={link.href}

                    className="text-sm font-light text-luxury-platinum/70 transition-colors hover:text-white"

                  >

                    {link.label}

                  </Link>

                </li>

              ))}

            </ul>

          </div>



          <div>

            <p className="luxury-label mb-4">Connect</p>

            <ul className="space-y-3 text-sm font-light text-luxury-platinum/70">

              <li>

                <a

                  href="mailto:hello@thephotogenicexperience.com"

                  className="transition-colors hover:text-white"

                >

                  hello@thephotogenicexperience.com

                </a>

              </li>

              <li>

                <a

                  href="tel:+17736398099"

                  className="transition-colors hover:text-white"

                >

                  (773) 639-8099

                </a>

              </li>

              <li>Serving Chicago, IL &amp; surrounding areas</li>

            </ul>

          </div>

        </div>



        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">

          <p className="text-xs text-luxury-chrome">

            &copy; {new Date().getFullYear()} The Photogenic Experience. All

            rights reserved.

          </p>

          <div className="flex gap-6">

            {["Instagram", "Facebook", "TikTok"].map((social) => (

              <a

                key={social}

                href="#"

                className="text-[10px] font-medium uppercase tracking-[0.15em] text-luxury-chrome transition-colors hover:text-accent-light"

              >

                {social}

              </a>

            ))}

          </div>

        </div>

      </div>

    </footer>

  );

}


