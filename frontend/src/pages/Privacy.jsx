import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pt-28 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-dveinBlue font-medium mb-10 transition-colors"
        >
          <FaArrowLeft className="text-xs" /> Back to Home
        </Link>

        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-12">Last updated: January 2026</p>

        <div className="prose prose-slate max-w-none space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Information We Collect</h2>
            <p>
              When you interact with DVein Innovations — through our website, contact forms, job
              applications, or course enrollments — we may collect personal information such as your
              name, email address, phone number, and any files you voluntarily submit (e.g., resumes
              or portfolios).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
              <li>Process and respond to job or internship applications.</li>
              <li>Send course enrollment confirmations and program updates.</li>
              <li>Respond to inquiries submitted through our contact form.</li>
              <li>Improve our services and website experience.</li>
            </ul>
            <p className="mt-3">
              We do <strong>not</strong> sell, trade, or otherwise transfer your personal information
              to third parties without your consent, except where required by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Data Storage & Security</h2>
            <p>
              All data submitted through our website is stored securely on our servers. We implement
              industry-standard security measures including HTTPS encryption, access controls, and
              regular security audits to protect your information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Cookies</h2>
            <p>
              Our website may use cookies to improve your browsing experience. These are small data
              files stored on your device. You can disable cookies through your browser settings at
              any time. We do not use tracking cookies for advertising purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Third-Party Links</h2>
            <p>
              Our website contains links to external services such as WhatsApp, Google Forms, and
              social media platforms. DVein Innovations is not responsible for the privacy practices
              of these third-party services and encourages you to review their respective privacy
              policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Your Rights</h2>
            <p>
              You have the right to request access to, correction of, or deletion of any personal
              data we hold about you. To exercise these rights, please contact us at{' '}
              <a
                href="mailto:info@dveininnovations.com"
                className="text-dveinBlue hover:underline font-medium"
              >
                info@dveininnovations.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Changes to This Policy</h2>
            <p>
              DVein Innovations reserves the right to update this Privacy Policy at any time. Changes
              will be posted on this page with an updated date. Continued use of our website after
              any changes constitutes your acceptance of the revised policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Contact</h2>
            <p>
              If you have any questions about this Privacy Policy, please reach us at:
            </p>
            <address className="not-italic mt-2 text-sm text-gray-600 space-y-1">
              <p><strong>DVein Innovations Pvt. Ltd.</strong></p>
              <p>Alpha City IT Park, No.25, OMR, Navalur, Chennai – 600130</p>
              <p>
                Email:{' '}
                <a href="mailto:info@dveininnovations.com" className="text-dveinBlue hover:underline">
                  info@dveininnovations.com
                </a>
              </p>
              <p>
                Phone:{' '}
                <a href="tel:+919500181230" className="text-dveinBlue hover:underline">
                  +91 95001 81230
                </a>
              </p>
            </address>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-100 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} DVein Innovations. All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default Privacy;
