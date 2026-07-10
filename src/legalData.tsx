import React from "react";

export const LEGAL_PAGES = {
  privacy: {
    title: "Privacy Policy",
    description: "At AIIndex, your privacy is our top priority. This comprehensive policy explains our data practices in meticulous detail.",
    lastUpdated: "July 10, 2026",
    sections: [
      {
        id: "intro",
        title: "1. Introduction to Our Privacy Commitment",
        content: (
          <div className="space-y-4">
            <p>Welcome to AIIndex. This Privacy Policy is designed to provide you with a transparent and comprehensive understanding of how we collect, process, manage, and protect the information that identifies you or is associated with you ("Personal Data"). Our commitment to privacy is not merely a legal obligation but a cornerstone of our relationship with our users.</p>
            <p>In the rapidly evolving landscape of artificial intelligence, where data is the primary engine of progress, we believe that transparency regarding data provenance and usage is paramount. This policy applies to all services provided by AIIndex, including our research syndicates, model comparison tools, API endpoints, and editorial platforms.</p>
            <p>By accessing or using AIIndex, you acknowledge that you have read and understood the practices described in this policy. We encourage you to read this document in its entirety to ensure you are fully informed about your rights and our responsibilities.</p>
          </div>
        )
      },
      {
        id: "collection",
        title: "2. Detailed Data Collection Categories",
        content: (
          <div className="space-y-4">
            <p>We collect several types of information from and about users of our platform. This collection is essential for providing accurate, high-performance AI benchmarking services and for maintaining the security and integrity of our ecosystem.</p>
            <h4 className="font-semibold text-gray-900 mt-4">2.1 Information You Provide to Us</h4>
            <p>When you interact with AIIndex, you may provide us with Personal Data directly. This includes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Identity Data:</strong> First name, last name, username, or similar identifier.</li>
              <li><strong>Contact Data:</strong> Email address, physical address, and telephone numbers.</li>
              <li><strong>Professional Data:</strong> Job title, company affiliation, industry, and professional interests in specific AI models or hardware configurations.</li>
              <li><strong>Communication Data:</strong> Records and copies of your correspondence (including email addresses), if you contact us.</li>
              <li><strong>Contribution Data:</strong> Content you submit for publication, comments on articles, and feedback on model benchmarks.</li>
            </ul>
            <h4 className="font-semibold text-gray-900 mt-4">2.2 Information We Collect Automatically</h4>
            <p>As you navigate through and interact with our platform, we may use automatic data collection technologies to collect certain information about your equipment, browsing actions, and patterns:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Usage Data:</strong> Details of your visits to our website, including traffic data, location data, logs, and other communication data and the resources that you access and use on the website (e.g., specific model comparison pages, benchmark datasets).</li>
              <li><strong>Device Information:</strong> Information about your computer and internet connection, including your IP address, operating system, and browser type.</li>
              <li><strong>Interaction Data:</strong> Time spent on specific comparison charts, frequency of tool usage, and navigation paths.</li>
            </ul>
          </div>
        )
      },
      {
        id: "usage",
        title: "3. Purposes of Data Processing",
        content: (
          <div className="space-y-4">
            <p>We process your data for several legitimate business purposes, ensuring that each processing activity is aligned with providing value to you and the broader AI research community.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>To Provide and Improve Services:</strong> To present our website and its contents to you and to provide you with information, products, or services that you request from us.</li>
              <li><strong>Research and Analytics:</strong> To conduct deep-dive analytics on model performance trends and user preferences, which helps us refine our benchmarking methodologies.</li>
              <li><strong>Security and Integrity:</strong> To detect, prevent, or otherwise address fraud, security, or technical issues, ensuring the AIIndex platform remains a trusted resource.</li>
              <li><strong>Communication:</strong> To provide you with notices about your account or subscription, including expiration and renewal notices, and to notify you about changes to our website or any products or services we offer or provide through it.</li>
              <li><strong>Marketing and Personalization:</strong> To deliver relevant content and advertisements to you and measure or understand the effectiveness of the advertising we serve to you.</li>
            </ul>
          </div>
        )
      },
      {
        id: "sharing",
        title: "4. Data Sharing and Disclosure Protocols",
        content: (
          <div className="space-y-4">
            <p>We do not sell your personal information. However, we may disclose aggregated information about our users, and information that does not identify any individual, without restriction. We may disclose personal information that we collect or you provide as described in this privacy policy:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Service Providers:</strong> To contractors, service providers, and other third parties we use to support our business (such as cloud hosting providers, analytics companies, and payment processors).</li>
              <li><strong>Compliance with Law:</strong> To comply with any court order, law, or legal process, including to respond to any government or regulatory request.</li>
              <li><strong>Business Transfers:</strong> To a buyer or other successor in the event of a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of AIIndex's assets.</li>
              <li><strong>Enforcement:</strong> To enforce or apply our terms of use and other agreements, including for billing and collection purposes.</li>
            </ul>
            <h4 className="font-semibold text-gray-900 mt-6">4.1 Detailed List of Third-Party Processors</h4>
            <div className="overflow-x-auto border border-gray-100 rounded-xl my-4">
              <table className="w-full text-left border-collapse text-xs">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-3 border-b">Processor Name</th>
                    <th className="p-3 border-b">Purpose</th>
                    <th className="p-3 border-b">Location</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border-b">Google Cloud Platform</td>
                    <td className="p-3 border-b">Infrastructure & Database Hosting</td>
                    <td className="p-3 border-b">USA / EU</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b">Stripe, Inc.</td>
                    <td className="p-3 border-b">Payment Processing & Subscription Management</td>
                    <td className="p-3 border-b">Global</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b">Mixpanel / Google Analytics</td>
                    <td className="p-3 border-b">Behavioral Analytics & UI Optimization</td>
                    <td className="p-3 border-b">USA</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b">Postmark / SendGrid</td>
                    <td className="p-3 border-b">Transactional Email & Security Alerts</td>
                    <td className="p-3 border-b">USA</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )
      },
      {
        id: "retention",
        title: "5. Data Retention and Deletion Schedule",
        content: (
          <div className="space-y-4">
            <p>We retain Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We maintain a detailed data retention schedule to ensure that your data is not kept longer than required by law or legitimate business necessity.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Account Information:</strong> Retained for the duration of your active account plus 7 years for tax and legal compliance.</li>
              <li><strong>Usage Logs:</strong> Retained for 12 months, then anonymized for long-term aggregate research.</li>
              <li><strong>Marketing Data:</strong> Retained until you opt-out or 2 years from last engagement.</li>
              <li><strong>Billing Records:</strong> Retained for 10 years as required by financial regulatory authorities.</li>
            </ul>
            <p>Upon expiry of the retention period, we will either delete or anonymize your Personal Data. If deletion is not possible (e.g., data stored in backup archives), we will securely store and isolate it from any further processing.</p>
          </div>
        )
      },
      {
        id: "international",
        title: "6. International Data Transfers (GDPR/UK GDPR)",
        content: (
          <div className="space-y-4">
            <p>AIIndex is headquartered in the United States. Information we collect may be transferred to, and stored and processed in, the United States and other countries where we or our service providers maintain facilities.</p>
            <p>For users in the European Economic Area (EEA), the UK, or Switzerland, we ensure a similar degree of protection is afforded to it by ensuring at least one of the following safeguards is implemented:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Adequacy Decisions:</strong> We only transfer your personal data to countries that have been deemed to provide an adequate level of protection for personal data.</li>
              <li><strong>Standard Contractual Clauses (SCCs):</strong> We use specific contracts approved by the European Commission which give personal data the same protection it has in Europe.</li>
              <li><strong>Data Privacy Framework (DPF):</strong> We participate in and comply with the EU-U.S. Data Privacy Framework.</li>
            </ul>
          </div>
        )
      },
      {
        id: "rights",
        title: "7. Your Global Data Rights and Exercise Protocol",
        content: (
          <div className="space-y-4">
            <p>Depending on your location (e.g., California, European Economic Area, UK, Australia), you may have specific rights regarding your personal information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Access & Portability:</strong> The right to request copies of your personal data and to receive it in a structured, machine-readable format.</li>
              <li><strong>Rectification:</strong> The right to request that we correct any information you believe is inaccurate or incomplete.</li>
              <li><strong>Erasure (Right to be Forgotten):</strong> The right to request that we erase your personal data under certain conditions.</li>
              <li><strong>Restriction of Processing:</strong> The right to request that we restrict the processing of your personal data under certain conditions.</li>
              <li><strong>Objection to Processing:</strong> The right to object to our processing of your personal data for direct marketing or based on legitimate interests.</li>
              <li><strong>Withdrawal of Consent:</strong> Where we rely on your consent to process data, you have the right to withdraw it at any time.</li>
            </ul>
            <h4 className="font-semibold text-gray-900 mt-4">7.1 How to Exercise Your Rights</h4>
            <p>To exercise any of these rights, please submit a request through our Privacy Portal or contact our Data Protection Officer (DPO) at privacy@aiindex.research. We will respond to all legitimate requests within 30 days (or sooner where required by law).</p>
          </div>
        )
      },
      {
        id: "regional",
        title: "8. Regional Supplements (CCPA/VCDPA)",
        content: (
          <div className="space-y-4">
            <p><strong>California Residents (CCPA/CPRA):</strong> We do not "sell" or "share" personal information as defined by California law. You have the right to know what personal information we collect, the right to delete it, and the right to opt-out of "sharing" for cross-context behavioral advertising.</p>
            <p><strong>Virginia, Colorado, Connecticut, Utah Residents:</strong> You have similar rights to access, delete, and correct your data, as well as the right to opt-out of targeted advertising and profiling that produces legal or similarly significant effects.</p>
          </div>
        )
      },
      {
        id: "dpo",
        title: "9. Data Protection Officer (DPO) and Regulatory Contact",
        content: (
          <div className="space-y-4">
            <p>To ensure the highest standards of data governance, AIIndex has appointed a Data Protection Officer (DPO) who oversees our privacy program and ensures compliance with global data protection laws including the GDPR, UK GDPR, and CCPA. Our DPO acts as the primary point of contact for data protection authorities and for users wishing to exercise their rights.</p>
            <p>If you have questions about this policy or our data practices, you can contact our DPO directly at dpo@aiindex.research or via registered mail at: AIIndex Legal Department, Attn: Data Protection Officer, 1000 Research Way, Suite 500, Wilmington, DE 19801, USA.</p>
          </div>
        )
      },
      {
        id: "lawful-basis",
        title: "10. Lawful Bases for Processing (GDPR Compliance)",
        content: (
          <div className="space-y-4">
            <p>For users located in the EEA or UK, we only process your Personal Data when we have a valid legal basis under Article 6 of the GDPR. These bases include:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Contractual Necessity:</strong> Processing required to provide our services to you under our Terms of Service (e.g., managing your account).</li>
              <li><strong>Consent:</strong> Where you have given clear, affirmative consent for a specific purpose (e.g., subscribing to our research newsletter).</li>
              <li><strong>Legitimate Interests:</strong> Processing necessary for our legitimate business interests, provided they do not override your fundamental rights (e.g., optimizing our UI based on behavioral analytics).</li>
              <li><strong>Legal Obligation:</strong> Processing required for us to comply with the law (e.g., maintaining financial records for tax purposes).</li>
            </ul>
          </div>
        )
      },
      {
        id: "children",
        title: "11. Children’s Privacy and COPPA Compliance",
        content: (
          <div className="space-y-4">
            <p>Our platform is directed to professionals and researchers in the AI industry and is not intended for children under the age of 18 (or the relevant age of majority in your jurisdiction). We do not knowingly collect personal information from children under 13 in accordance with the Children's Online Privacy Protection Act (COPPA).</p>
            <p>If we become aware that we have inadvertently collected Personal Data from a child under the age of 13, we will take immediate steps to delete such information from our servers. Parents or guardians who believe we might have any information from or about a child under 13 should contact us at privacy@aiindex.research.</p>
          </div>
        )
      },
      {
        id: "security-incident",
        title: "12. Data Security Incident Response Protocol",
        content: (
          <div className="space-y-4">
            <p>While no system is 100% secure, AIIndex maintains a robust Data Security Incident Response Plan (DSIRP) to address any potential data breaches or unauthorized access. In the event of a significant data breach that is likely to result in a high risk to your rights and freedoms, we will notify you and the relevant supervisory authorities without undue delay, and within 72 hours where required by the GDPR.</p>
            <p>Our notification will include a description of the nature of the breach, the categories of data affected, and the measures we are taking to mitigate the impact and prevent recurrence.</p>
          </div>
        )
      },
      {
        id: "minimization",
        title: "13. Data Minimization and Accuracy Principles",
        content: (
          <div className="space-y-4">
            <p>AIIndex adheres to the principles of data minimization and purpose limitation. We only collect the minimum amount of Personal Data necessary for our stated purposes. Furthermore, we take reasonable steps to ensure that the Personal Data we process is accurate, complete, and kept up-to-date. Users are encouraged to update their account information regularly through the user profile dashboard.</p>
          </div>
        )
      }
    ]
  },
  terms: {
    title: "Terms of Service",
    description: "These terms govern your access to and use of AIIndex. Please read them thoroughly.",
    lastUpdated: "July 10, 2026",
    sections: [
      {
        id: "agreement",
        title: "1. Agreement to Terms and Binding Arbitration",
        content: (
          <div className="space-y-4">
            <p>These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and AIIndex ("Company," "we," "us," or "our"), concerning your access to and use of our website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site").</p>
            <p>You agree that by accessing the Site, you have read, understood, and agreed to be bound by all of these Terms of Service. IF YOU DO NOT AGREE WITH ALL OF THESE TERMS OF SERVICE, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SITE AND YOU MUST DISCONTINUE USE IMMEDIATELY.</p>
            <p className="font-bold text-gray-900">IMPORTANT NOTICE: THESE TERMS CONTAIN A BINDING ARBITRATION PROVISION AND CLASS ACTION WAIVER THAT AFFECT YOUR LEGAL RIGHTS. PLEASE READ SECTION 10 CAREFULLY.</p>
          </div>
        )
      },
      {
        id: "intellectual-property",
        title: "2. Intellectual Property Rights and License",
        content: (
          <div className="space-y-4">
            <p>Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us.</p>
            <h4 className="font-semibold text-gray-900">2.1 Limited License</h4>
            <p>Subject to your compliance with these Terms, we grant you a non-exclusive, non-transferable, revocable license to access the Site and use the Content for your internal, non-commercial research purposes only. You may not scrape, crawl, or otherwise automate the extraction of benchmark data without an express Enterprise License Agreement.</p>
          </div>
        )
      },
      {
        id: "user-representations",
        title: "3. User Representations and Eligibility",
        content: (
          <div className="space-y-4">
            <p>By using the Site, you represent and warrant that:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>All registration information you submit will be true, accurate, current, and complete.</li>
              <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
              <li>You have the legal capacity and you agree to comply with these Terms of Service.</li>
              <li>You are at least 18 years of age or the age of majority in your jurisdiction.</li>
              <li>You will not access the Site through automated or non-human means, whether through a bot, script or otherwise.</li>
              <li>You will not use the Site for any illegal or unauthorized purpose.</li>
              <li>Your use of the Site will not violate any applicable law or regulation.</li>
            </ul>
          </div>
        )
      },
      {
        id: "subscriptions",
        title: "4. Subscriptions, Billing and Cancellations",
        content: (
          <div className="space-y-4">
            <p>Some parts of the Service are billed on a subscription basis ("Subscription(s)"). You will be billed in advance on a recurring and periodic basis ("Billing Cycle"). Billing cycles are set either on a monthly or annual basis.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Auto-Renewal:</strong> At the end of each Billing Cycle, your Subscription will automatically renew under the exact same conditions unless you cancel it.</li>
              <li><strong>Cancellation:</strong> You may cancel your Subscription renewal either through your online account management page or by contacting our customer support team.</li>
              <li><strong>Refunds:</strong> Except when required by law, paid Subscription fees are non-refundable.</li>
            </ul>
          </div>
        )
      },
      {
        id: "prohibited-activities",
        title: "5. Prohibited Activities and Acceptable Use",
        content: (
          <div className="space-y-4">
            <p>You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.</p>
            <p>As a user of the Site, you agree not to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Systematically retrieve data or other content from the Site to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
              <li>Circumvent, disable, or otherwise interfere with security-related features of the Site.</li>
              <li>Engage in unauthorized framing of or linking to the Site.</li>
              <li>Interfere with, disrupt, or create an undue burden on the Site or the networks or services connected to the Site.</li>
              <li>Use the Site as part of any effort to compete with us or otherwise use the Site and/or the Content for any revenue-generating endeavor or commercial enterprise.</li>
            </ul>
          </div>
        )
      },
      {
        id: "disclaimer",
        title: "6. Disclaimer of Warranties",
        content: (
          <div className="space-y-4">
            <p>THE SITE IS PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SITE AND OUR SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SITE AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
          </div>
        )
      },
      {
        id: "limitation-liability",
        title: "7. Limitation of Liability and Indemnification",
        content: (
          <div className="space-y-4">
            <p>IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SITE.</p>
            <p><strong>Indemnification:</strong> You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys' fees and expenses, made by any third party due to or arising out of: (1) your Contributions; (2) use of the Site; (3) breach of these Terms of Service; or (4) any breach of your representations and warranties set forth in these Terms of Service.</p>
          </div>
        )
      },
      {
        id: "governing-law",
        title: "8. Governing Law and Jurisdiction",
        content: (
          <div className="space-y-4">
            <p>These Terms shall be governed by and defined following the laws of the State of Delaware, United States. AIIndex and yourself irrevocably consent that the courts of Delaware shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.</p>
          </div>
        )
      },
      {
        id: "dispute-resolution",
        title: "9. Dispute Resolution",
        content: (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">9.1 Informal Negotiations</h4>
            <p>To expedite resolution and control the cost of any dispute, controversy, or claim related to these Terms of Service (each a "Dispute" and collectively, the "Disputes") brought by either you or us (individually, a "Party" and collectively, the "Parties"), the Parties agree to first attempt to negotiate any Dispute (except those Disputes expressly provided below) informally for at least thirty (30) days before initiating arbitration.</p>
            <h4 className="font-semibold text-gray-900">9.2 Binding Arbitration</h4>
            <p>If the Parties are unable to resolve a Dispute through informal negotiations, the Dispute (except those Disputes expressly excluded below) will be finally and exclusively resolved by binding arbitration. YOU UNDERSTAND THAT WITHOUT THIS PROVISION, YOU WOULD HAVE THE RIGHT TO SUE IN COURT AND HAVE A JURY TRIAL.</p>
          </div>
        )
      },
      {
        id: "termination",
        title: "10. Term and Termination",
        content: (
          <div className="space-y-4">
            <p>These Terms of Service shall remain in full force and effect while you use the Site. WITHOUT LIMITING ANY OTHER PROVISION OF THESE TERMS OF SERVICE, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SITE (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON.</p>
          </div>
        )
      },
      {
        id: "user-content",
        title: "11. User Content and License Grant",
        content: (
          <div className="space-y-4">
            <p>The Site may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality, and may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the Site, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material (collectively, "Contributions").</p>
            <p>When you create or make available any Contributions, you thereby represent and warrant that the creation, distribution, transmission, public display, or performance, and the accessing, downloading, or copying of your Contributions do not and will not infringe the proprietary rights, including but not limited to the copyright, patent, trademark, trade secret, or moral rights of any third party.</p>
            <p>By posting your Contributions to any part of the Site, you automatically grant, and you represent and warrant that you have the right to grant, to us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive, transferable, royalty-free, fully-paid, worldwide right, and license to host, use, copy, reproduce, disclose, sell, resell, publish, broadcast, retitle, archive, store, cache, publicly perform, publicly display, reformat, translate, transmit, excerpt (in whole or in part), and distribute such Contributions for any purpose, commercial, advertising, or otherwise.</p>
          </div>
        )
      },
      {
        id: "third-party",
        title: "12. Third-Party Websites and Content Disclaimer",
        content: (
          <div className="space-y-4">
            <p>The Site may contain (or you may be sent via the Site) links to other websites ("Third-Party Websites") as well as articles, photographs, text, graphics, pictures, designs, music, sound, video, information, applications, software, and other content or items belonging to or originating from third parties ("Third-Party Content").</p>
            <p>Such Third-Party Websites and Third-Party Content are not investigated, monitored, or checked for accuracy, appropriateness, or completeness by us, and we are not responsible for any Third-Party Websites accessed through the Site or any Third-Party Content posted on, available through, or installed from the Site, including the content, accuracy, offensiveness, opinions, reliability, privacy practices, or other policies of or contained in the Third-Party Websites or the Third-Party Content.</p>
          </div>
        )
      },
      {
        id: "management",
        title: "13. Site Management and Moderation Rights",
        content: (
          <div className="space-y-4">
            <p>We reserve the right, but not the obligation, to: (1) monitor the Site for violations of these Terms of Service; (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Terms of Service, including without limitation, reporting such user to law enforcement authorities; (3) in our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your Contributions or any portion thereof; (4) in our sole discretion and without limitation, notice, or liability, to remove from the Site or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems; and (5) otherwise manage the Site in a manner designed to protect our rights and property and to facilitate the proper functioning of the Site.</p>
          </div>
        )
      },
      {
        id: "modifications",
        title: "14. Modifications to and Interruptions of the Service",
        content: (
          <div className="space-y-4">
            <p>We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Site. We also reserve the right to modify or discontinue all or part of the Site without notice at any time.</p>
            <p>We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Site. We cannot guarantee the Site will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the Site, resulting in interruptions, delays, or errors.</p>
          </div>
        )
      },
      {
        id: "miscellaneous",
        title: "15. Miscellaneous Provisions (Force Majeure, Severability)",
        content: (
          <div className="space-y-4">
            <p>These Terms of Service and any policies or operating rules posted by us on the Site or in respect to the Site constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Terms of Service shall not operate as a waiver of such right or provision. These Terms of Service operate to the fullest extent permissible by law.</p>
            <p>We may assign any or all of our rights and duties to others at any time. We shall not be responsible or liable for any loss, damage, delay, or failure to act caused by any cause beyond our reasonable control (Force Majeure). If any provision or part of a provision of these Terms of Service is determined to be unlawful, void, or unenforceable, that provision or part of the provision is deemed severable from these Terms of Service and does not affect the validity and enforceability of any remaining provisions.</p>
          </div>
        )
      }
    ]
  },
  cookies: {
    title: "Cookie Policy",
    description: "This policy explains how AIIndex uses cookies and similar technologies.",
    lastUpdated: "July 10, 2026",
    sections: [
      {
        id: "intro",
        title: "1. Understanding Our Cookie Usage",
        content: (
          <div className="space-y-4">
            <p>At AIIndex, we believe in being clear and open about how we collect and use data related to you. In the spirit of transparency, this policy provides detailed information about how and when we use cookies on our Site. This Cookie Policy applies to any AIIndex product or service that links to this policy or incorporates it by reference.</p>
            <p>As is common practice with almost all professional websites, this site uses cookies—tiny files that are downloaded to your computer—to improve your experience. This page describes what information they gather, how we use it, and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored; however, this may downgrade or 'break' certain elements of the sites' functionality.</p>
          </div>
        )
      },
      {
        id: "what-are-cookies",
        title: "2. Technical Definition of Cookies",
        content: (
          <div className="space-y-4">
            <p>A cookie is a small file placed on your device that enables AIIndex features and functionality. For example, cookies enable us to identify your device, secure your access to AIIndex and our sites generally, and even help us know if someone attempts to access your account from a different device. Cookies also enable you to easily share content on AIIndex and help us serve relevant ads to you.</p>
            <p>We use two types of cookies: persistent cookies and session cookies. A persistent cookie helps us recognize you as an existing user, so it’s easier to return to AIIndex or interact with our services without signing in again. After you sign in, a persistent cookie stays in your browser and will be read by AIIndex when you return to our site. Session cookies only last for as long as the session (usually the current visit to a website or a browser session).</p>
          </div>
        )
      },
      {
        id: "usage",
        title: "3. Specific Cookie Categories and Functions",
        content: (
          <div className="space-y-4">
            <p>AIIndex uses different types of cookies to run the platform and provide its core benchmarking services:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
              <div className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
                <h5 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-600" />
                  Authentication
                </h5>
                <p className="text-xs text-gray-600">If you're signed in to AIIndex, cookies help us show you the right information and personalize your experience. We use these to verify your account and determine when you’re logged in.</p>
              </div>
              <div className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
                <h5 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-600" />
                  Security
                </h5>
                <p className="text-xs text-gray-600">We use cookies to enable and support our security features, and to help us detect malicious activity and violations of our User Agreement. This protects your research data.</p>
              </div>
              <div className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
                <h5 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-600" />
                  Preferences
                </h5>
                <p className="text-xs text-gray-600">Cookies can tell us which language you prefer and what your communications preferences are. They can help you fill out forms on AIIndex more easily.</p>
              </div>
              <div className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
                <h5 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-600" />
                  Analytics
                </h5>
                <p className="text-xs text-gray-600">These help us learn how well our site and plugins perform in different locations. We also use cookies to understand, improve, and research products and features.</p>
              </div>
            </div>
            <p>We also use Adobe Flash cookies (sometimes called Local Shared Objects or "LSOs") and other similar technologies to store your preferences or display content based upon what you view on our site to personalize your visit.</p>
          </div>
        )
      },
      {
        id: "control",
        title: "4. Managing and Controlling Cookies",
        content: (
          <div className="space-y-4">
            <p>Most browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience, since it will no longer be personalized to you. It may also stop you from saving custom benchmark comparisons or hardware presets.</p>
            <p>If you do not want to receive cookies, you can also change your browser settings on your computer or other device you're using to access our services. If you use AIIndex without changing your browser settings, we'll assume that you’re happy to receive all cookies on the AIIndex website.</p>
            <p>To find out more about cookies, including how to see what cookies have been set and how to manage and delete them, visit wikipedia.org, www.allaboutcookies.org, or www.aboutcookies.org.</p>
          </div>
        )
      },
      {
        id: "tracking",
        title: "5. Other Tracking Technologies (Web Beacons & Pixels)",
        content: (
          <div className="space-y-4">
            <p>In addition to cookies, we may use other tracking technologies like web beacons (sometimes called tracking pixels or "clear gifs") to understand user behavior. These are tiny graphics with a unique identifier, similar in function to cookies, and are used to track the online movements of Web users. In contrast to cookies, which are stored on a user's computer hard drive, clear gifs are embedded invisibly on Web pages and are about the size of the period at the end of this sentence.</p>
            <p>We use web beacons in our HTML-based emails to let us know which emails have been opened by recipients. This allows us to gauge the effectiveness of certain communications and the effectiveness of our marketing campaigns.</p>
          </div>
        )
      },
      {
        id: "updates",
        title: "6. Updates to This Cookie Policy",
        content: (
          <div className="space-y-4">
            <p>We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.</p>
            <p>The date at the top of this Cookie Policy indicates when it was last updated. If we make any material changes, we will notify you by posting a prominent notice on our Site or by sending you an email notification.</p>
          </div>
        )
      }
    ]
  },
  disclaimer: {
    title: "Legal Disclaimer",
    description: "Important information regarding the limitations of the data provided by AIIndex.",
    lastUpdated: "July 10, 2026",
    sections: [
      {
        id: "nature",
        title: "1. Comprehensive Nature of the Information",
        content: (
          <div className="space-y-4">
            <p>The information provided by AIIndex ("we," "us," or "our") on AIIndex (the "Site") is for general informational purposes only. All information on the Site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.</p>
            <p>The AI landscape is characterized by unprecedented volatility. Model weights, quantization techniques, and inference optimizations are updated daily. As such, the benchmarks presented on AIIndex are a 'snapshot' of performance at a specific point in time and should not be viewed as absolute or permanent truths.</p>
            <p>UNDER NO CIRCUMSTANCE SHALL WE HAVE ANY LIABILITY TO YOU FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF THE SITE OR RELIANCE ON ANY INFORMATION PROVIDED ON THE SITE. YOUR USE OF THE SITE AND YOUR RELIANCE ON ANY INFORMATION ON THE SITE IS SOLELY AT YOUR OWN RISK.</p>
          </div>
        )
      },
      {
        id: "benchmarks",
        title: "2. Technical Benchmark Limitations",
        content: (
          <div className="space-y-4">
            <p>The Site contains AI model benchmarks, comparisons, and research data. These benchmarks are often based on third-party evaluations and are subject to change as models are updated. We do not guarantee the replicability of these benchmarks in every environment.</p>
            <p>AI performance is highly dependent on specific hardware (H100 vs A100 vs Consumer GPUs), software configurations (CUDA versions, vLLM optimizations), and prompt engineering techniques. The results shown on AIIndex should be treated as comparative indicators rather than absolute performance guarantees. We strongly recommend conducting internal pilot testing before deploying any AI model in a production environment based on our data.</p>
          </div>
        )
      },
      {
        id: "errors",
        title: "3. Errors and Omissions Disclaimer",
        content: (
          <div className="space-y-4">
            <p>While we have made every attempt to ensure that the information contained in this site has been obtained from reliable sources, AIIndex is not responsible for any errors or omissions, or for the results obtained from the use of this information. All information in this site is provided "as is", with no guarantee of completeness, accuracy, timeliness or of the results obtained from the use of this information, and without warranty of any kind, express or implied.</p>
            <p>In no event will AIIndex, its related partnerships or corporations, or the partners, agents or employees thereof be liable to you or anyone else for any decision made or action taken in reliance on the information in this Site or for any consequential, special or similar damages, even if advised of the possibility of such damages.</p>
          </div>
        )
      },
      {
        id: "fair-use",
        title: "4. Fair Use Disclaimer",
        content: (
          <div className="space-y-4">
            <p>This site may contain copyrighted material the use of which has not always been specifically authorized by the copyright owner. We are making such material available in our efforts to advance understanding of artificial intelligence, technical benchmarking, and industry research. We believe this constitutes a 'fair use' of any such copyrighted material as provided for in section 107 of the US Copyright Law.</p>
            <p>If you wish to use copyrighted material from this site for purposes of your own that go beyond 'fair use', you must obtain permission from the copyright owner.</p>
          </div>
        )
      },
      {
        id: "views",
        title: "5. Views Expressed Disclaimer",
        content: (
          <div className="space-y-4">
            <p>The views and opinions expressed on AIIndex are those of the authors and do not necessarily reflect the official policy or position of any other agency, organization, employer or company, including AIIndex. Comments published by users are their sole responsibility and the users will take full responsibility, liability and blame for any libel or litigation that results from something written in or as a direct result of something written in a comment.</p>
          </div>
        )
      }
    ]
  },
  editorial: {
    title: "Editorial Policy",
    description: "Our standards for accuracy, independence, and transparency in AI reporting.",
    lastUpdated: "July 10, 2026",
    sections: [
      {
        id: "principles",
        title: "1. Core Editorial Principles and Ethics",
        content: (
          <div className="space-y-4">
            <p>AIIndex is committed to providing our readers with the most accurate, objective, and up-to-date information regarding the global AI landscape. Our editorial process is guided by three core principles that ensure our research remains the "gold standard" for the industry:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Absolute Objectivity:</strong> Our reviews and rankings are based strictly on data and standardized benchmarks. We do not use qualitative descriptors without backing them with quantitative evidence. We strive to present information without bias, regardless of a model provider's market share.</li>
              <li><strong>Methodological Transparency:</strong> We clearly state our benchmarking methodologies, hardware specifications, and data sources. If we use synthetic data for evaluation, we disclose the prompt distribution and generation model used.</li>
              <li><strong>Financial Independence:</strong> Our editorial team operates independently from any commercial partnerships. We do not accept sponsorship in exchange for favorable reviews or inflated benchmark scores.</li>
            </ul>
          </div>
        )
      },
      {
        id: "sourcing",
        title: "2. Sourcing and Verification Standards",
        content: (
          <div className="space-y-4">
            <p>We rely on primary sources whenever possible. This includes model weights, whitepapers from foundation labs, and direct API testing. When secondary sources are used (e.g., community-led evals on Hugging Face), we cross-reference them with at least two other independent sources before publication.</p>
            <p>Our verification process includes a 'reproducibility audit' where a second analyst attempts to recreate the reported benchmarks in a separate hardware environment. If the results deviate by more than 5%, we flag the data for further internal review and do not publish until the discrepancy is understood.</p>
          </div>
        )
      },
      {
        id: "corrections",
        title: "3. Corrections and Updates Policy",
        content: (
          <div className="space-y-4">
            <p>In the high-speed world of AI, information changes quickly. We are committed to correcting errors of fact or data as soon as they are identified. When a significant correction is made to an article or benchmark dataset, we provide a clear 'Correction' or 'Update' note at the top of the content, detailing what was changed and why.</p>
            <p>Readers who believe they have identified an error in our reporting are encouraged to contact our Editorial Standards team at editorial@aiindex.research. We investigate all credible reports within 48 hours.</p>
          </div>
        )
      },
      {
        id: "independence",
        title: "4. Advertising and Editorial Independence",
        content: (
          <div className="space-y-4">
            <p>Advertising revenue and affiliate commissions are essential to funding our compute-intensive research. However, there is a strict separation between our sales team and our editorial staff. Advertisers have no influence over the content, rankings, or tone of our research reports. Sponsored content is always clearly labeled as such and does not impact our standardized benchmark scores.</p>
          </div>
        )
      }
    ]
  },
  aipolicy: {
    title: "AI Content Policy",
    description: "How we responsibly use artificial intelligence in our research and reporting.",
    lastUpdated: "July 10, 2026",
    sections: [
      {
        id: "disclosure",
        title: "1. Responsible Disclosure of AI Usage",
        content: (
          <div className="space-y-4">
            <p>At AIIndex, we believe that AI should be used to augment human intelligence, not replace it. We use artificial intelligence to help us analyze massive datasets, synthesize model performance metrics across thousands of runs, and assist in the initial drafting of technical documentation. This allows our analysts to focus on high-level interpretation and strategic nuance.</p>
            <p>We transparently disclose our use of AI in our content generation. Articles that have been significantly assisted by AI for data synthesis or drafting include a specific 'AI-Assisted Research' badge at the top of the page.</p>
          </div>
        )
      },
      {
        id: "ethics",
        title: "2. Ethical AI Implementation Framework",
        content: (
          <div className="space-y-4">
            <p>We do not use AI to generate "slop"—low-quality, unverified, or hallucinatory content. Our AI tools are restricted to well-defined tasks where they have proven accuracy, such as formatting raw benchmark JSON into scannable tables or summarizing technical model whitepapers.</p>
            <p>Furthermore, we never use AI to generate opinions, verdicts, or strategic advice. These critical editorial components are always authored by our senior analysts based on their professional experience and the data provided by our benchmarking engine.</p>
          </div>
        )
      },
      {
        id: "copyright",
        title: "3. AI and Intellectual Property Rights",
        content: (
          <div className="space-y-4">
            <p>We are sensitive to the ongoing legal and ethical debates regarding AI training data and copyright. AIIndex does not use any scraping tools that violate a website's robots.txt or terms of service. When using AI to assist in our research, we ensure that the models used are compliant with relevant IP laws and that our internal data remains private and secure.</p>
          </div>
        )
      }
    ]
  },
  affiliate: {
    title: "Affiliate Disclosure",
    description: "Transparency regarding how AIIndex remains a free resource for the community.",
    lastUpdated: "July 10, 2026",
    sections: [
      {
        id: "purpose",
        title: "1. Supporting High-Compute Research",
        content: (
          <div className="space-y-4">
            <p>AIIndex is a free resource supported by our readers. Some of the links on this website are "affiliate links." This means that if you click on the link and purchase the item or sign up for a service, we will receive an affiliate commission at no extra cost to you.</p>
            <p>The costs of running a world-class AI benchmarking platform are significant. This includes the salaries of our elite researchers and data scientists, and the substantial electricity and compute costs required for independent model testing on H100/H200 clusters. Affiliate commissions are a primary way we fund this vital research for the community.</p>
          </div>
        )
      },
      {
        id: "impact",
        title: "2. Editorial Firewall",
        content: (
          <div className="space-y-4">
            <p>We maintain a strict "Editorial Firewall" between our business development team and our research analysts. Whether or not we have an affiliate relationship with a model provider or hardware manufacturer has zero impact on our editorial content, model rankings, or benchmark scores.</p>
            <p>We only recommend tools, APIs, and hardware that we genuinely believe provide value to the AI community based on our data. We often link to services that offer no affiliate program simply because they are the best tools for a specific task.</p>
          </div>
        )
      },
      {
        id: "transparency",
        title: "3. Transparency Guarantee",
        content: (
          <div className="space-y-4">
            <p>You are under no obligation to use our affiliate links. If you prefer, you can navigate directly to the service provider's website without using our links. However, using our links is a powerful way to support the continued existence of free, high-quality AI research.</p>
          </div>
        )
      }
    ]
  },
  accessibility: {
    title: "Accessibility Statement",
    description: "Our commitment to making AI knowledge accessible to all.",
    lastUpdated: "July 10, 2026",
    sections: [
      {
        id: "commitment",
        title: "1. Our Broad Commitment to Inclusion",
        content: (
          <div className="space-y-4">
            <p>AIIndex is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards. We believe that access to AI knowledge and the tools to evaluate it should not be limited by physical or cognitive ability.</p>
            <p>In the age of AI, where these tools are reshaping the workforce and society, access to objective evaluation data is a fundamental equity issue. We strive to make our data visualizers, comparison tables, and research reports accessible to the widest possible audience.</p>
          </div>
        )
      },
      {
        id: "standard",
        title: "2. Technical Conformance Standard",
        content: (
          <div className="space-y-4">
            <p>The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA. AIIndex is committed to WCAG 2.1 level AA conformance across all core features.</p>
            <p>Key accessibility features on AIIndex include:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>High-Contrast Visuals:</strong> Our charts and tables use color palettes that are tested for sufficient contrast for users with visual impairments.</li>
              <li><strong>Keyboard Navigation:</strong> All interactive elements, including our complex model comparison tools, are navigable via keyboard.</li>
              <li><strong>Screen Reader Optimization:</strong> We use ARIA labels and semantic HTML to ensure that our data tables and research summaries are interpreted correctly by assistive technologies.</li>
              <li><strong>Responsive Design:</strong> Our site is designed to be fully functional even when zoomed up to 200%.</li>
            </ul>
          </div>
        )
      },
      {
        id: "feedback",
        title: "3. Continuous Improvement and Feedback",
        content: (
          <div className="space-y-4">
            <p>We regularly audit our site using both automated tools and manual testing with screen readers. Despite our best efforts, some legacy content or experimental data visualizers may still present challenges. We welcome your feedback on the accessibility of AIIndex. Please let us know if you encounter accessibility barriers by contacting our Accessibility Coordinator at accessibility@aiindex.research.</p>
          </div>
        )
      }
    ]
  }
};
