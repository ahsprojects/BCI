import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import ContactForm from '../components/forms/contact-form';

const Page = () => {
    return (
        <main>
            <Header />
            <div className="relative overflow-hidden bg-white">
                <div className="relative isolate px-6 pt-28 lg:px-8">
                    <ContactForm />
                </div>
            </div>
        </main>
    );
};

export default Page;

