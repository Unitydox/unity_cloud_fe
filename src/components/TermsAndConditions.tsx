import { XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";

interface TermsAndConditionsProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({isOpen, setIsOpen}) => {
    
	return (
		<Dialog
            size="xl"
            open={isOpen}
			handler={() => setIsOpen(false)}
            
		>
			<DialogHeader className="justify-between shadow-sm">
                Unitydox Photos App - Terms and Conditions
                <XMarkIcon className="h-6 w-6 cursor-pointer" onClick={() => setIsOpen(false)} />
            </DialogHeader>

			<DialogBody
				divider={false}
			>
				<div className="h-[80vh] overflow-y-auto px-4 py-2">
					<p>
						These Terms and Conditions (&quot;Terms&quot;) govern your use of
						the Unitydox photos app (the &quot;App&quot;). By accessing or using
						the App, you agree to comply with and be bound by these Terms. If
						you do not agree to these Terms, please do not use the App.
					</p>

					<h2 className="my-4 text-xl font-semibold">1. Use of the App</h2>

					<p>
						1.1. Eligibility: You must be at least 13 years of age to use the
						App. By using the App, you represent and warrant that you are 13
						years of age or older.
					</p>

					<p>
						1.2. User Account: If you choose to sign up for an account, you are
						responsible for maintaining the confidentiality of your account
						credentials and for all activities that occur under your account.
						You agree to notify us immediately of any unauthorized use of your
						account.
					</p>

					<p>
						1.3. User Content: You may upload, post, or otherwise provide
						content, including photos, to the App (&quot;User Content&quot;).
						You retain ownership of your User Content, but by providing it, you
						grant Unitydox a worldwide, non-exclusive, royalty-free license to
						use, reproduce, modify, adapt, and display your User Content in
						connection with the App.
					</p>

					<p>1.4. Prohibited Activities: You agree not to:</p>
					<ul className="ml-8 list-disc">
						<li>Use the App for any unlawful or unauthorized purpose.</li>
						<li>
							Upload, post, or transmit any content that is infringing,
							defamatory, obscene, or otherwise objectionable.
						</li>
						<li>Use the App to transmit any viruses or malicious code.</li>
						<li>
							Attempt to gain unauthorized access to the App or its servers.
						</li>
					</ul>

					<h2 className="my-4 text-xl font-semibold">2. Privacy</h2>

					<p>
						2.1. Our use of your personal information is governed by our Privacy
						Policy, which is incorporated by reference into these Terms. Please
						review our Privacy Policy to understand our data practices.
					</p>

					<h2 className="my-4 text-xl font-semibold">
						3. Intellectual Property
					</h2>

					<p>
						3.1. All content, trademarks, and logos on the App are the property
						of Naviksh Technologies Private Limited or its licensors. You may
						not use, reproduce, or distribute any content from the App without
						our prior written permission.
					</p>

					<h2 className="my-4 text-xl font-semibold">4. Termination</h2>

					<p>
						4.1. We reserve the right to terminate or suspend your account and
						access to the App at our sole discretion, without notice and for any
						reason, including, but not limited to, a breach of these Terms.
					</p>

					<h2 className="my-4 text-xl font-semibold">
						5. Disclaimer of Warranties
					</h2>

					<p>
						5.1. The App is provided on an &quot;as-is&quot; and
						&quot;as-available&quot; basis, without any warranties, either
						express or implied. We do not warrant that the App will be
						error-free or uninterrupted, or that it will meet your requirements.
					</p>

					<h2 className="my-4 text-xl font-semibold">
						6. Limitation of Liability
					</h2>

					<p>
						6.1. Unitydox and its affiliates shall not be liable for any
						indirect, incidental, special, consequential, or punitive damages,
						or any loss of profits or revenues, whether incurred directly or
						indirectly, or any loss of data, use, goodwill, or other intangible
						losses.
					</p>

					<h2 className="my-4 text-xl font-semibold">7. Governing Law</h2>

					<p>
						7.1. These Terms are governed by and construed in accordance with
						the laws of [Your Jurisdiction].
					</p>

					<h2 className="my-4 text-xl font-semibold">8. Changes to Terms</h2>

					<p>
						8.1. Unitydox reserves the right to update and revise these Terms
						from time to time. Any changes will be posted on this page, and the
						date at the top of these Terms will indicate the last update. Your
						continued use of the App after such changes constitutes acceptance
						of the updated Terms.
					</p>

					<h2 className="my-4 text-xl font-semibold">9. Contact Us</h2>

					<p>
						9.1. If you have any questions, concerns, or feedback regarding
						these Terms, please contact us at admin@unitydox.com
					</p>

					<p>
						By using the App, you signify your acceptance of these Terms and
						Conditions. If you do not agree with the terms of this agreement,
						please do not use the App.
					</p>

					<p>Thank you for choosing Unitydox!</p>
				</div>
			</DialogBody>
		</Dialog>
	);
};

export default TermsAndConditions;
