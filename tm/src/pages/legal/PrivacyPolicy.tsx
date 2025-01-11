import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LegalLayout } from '@/components/common/LegalLayout';

export function PrivacyPolicy() {
  return (
    <LegalLayout>
      <div className="container mx-auto py-12 px-4">
        <Card className="bg-white/10 backdrop-blur-lg text-white border-0">
          <CardHeader>
            <CardTitle className="text-3xl">Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-invert max-w-none">
            <p className="text-gray-300 mb-6">Last updated: March 20, 2024</p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">Information We Collect</h2>
                <p className="text-gray-300">
                  We collect information that you provide directly to us, including name, email address, 
                  and other contact information when you register for an account or communicate with us.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">How We Use Your Information</h2>
                <ul className="list-disc pl-6 space-y-3 text-gray-300">
                  <li>To provide and maintain our Service</li>
                  <li>To notify you about changes to our Service</li>
                  <li>To provide customer support</li>
                  <li>To gather analysis or valuable information to improve our Service</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">Data Security</h2>
                <p className="text-gray-300">
                  The security of your data is important to us. We implement appropriate security measures 
                  to protect your personal information from unauthorized access, alteration, or disclosure.
                </p>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </LegalLayout>
  );
}