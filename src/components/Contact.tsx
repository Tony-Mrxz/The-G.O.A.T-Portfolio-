import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, User, MessageSquare, Github, Instagram, Linkedin } from 'lucide-react';
import emailjs from '@emailjs/browser';

// Discord Icon
const DiscordIcon = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.054-3.03.076.076 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.947 2.419-2.157 2.419zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z" />
    </svg>
);

// Elite Input Component
const EliteInput = ({ icon: Icon, placeholder, type = "text", value, onChange, multiline = false }: {
    icon: React.ElementType,
    placeholder: string,
    type?: string,
    value: string,
    onChange: (v: string) => void,
    multiline?: boolean
}) => (
    <div className="relative group">
        <div className={`absolute left-4 ${multiline ? 'top-5' : 'top-1/2 -translate-y-1/2'} text-white/30 group-focus-within:text-white/60 transition-colors duration-300`}>
            <Icon size={20} strokeWidth={1.5} />
        </div>
        {multiline ? (
            <textarea
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                rows={5}
                className="w-full pl-14 pr-6 py-4 bg-white/[0.03] border border-white/10 rounded-2xl text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all duration-300 resize-none"
                style={{ fontFamily: "'Kanit', sans-serif" }}
            />
        ) : (
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-white/[0.03] border border-white/10 rounded-2xl text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all duration-300"
                style={{ fontFamily: "'Kanit', sans-serif" }}
            />
        )}
    </div>
);

// Social Link Button
const SocialButton = ({ icon: Icon, href, label, color }: { icon: React.ElementType, href: string, label: string, color: string }) => (
    <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`group flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all duration-500`}
        whileHover={{ x: 5 }}
    >
        <div className={`p-3 rounded-xl bg-white/[0.05] ${color} transition-colors duration-300`}>
            <Icon size={22} />
        </div>
        <span
            className="text-white/60 group-hover:text-white transition-colors duration-300 text-sm uppercase tracking-[0.15em]"
            style={{ fontFamily: "'Kanit', sans-serif" }}
        >
            {label}
        </span>
    </motion.a>
);

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        const serviceID = 'mrxz_service';
        const templateID = 'template_xtg3ebf';
        const publicKey = '5tezYIl5-Ybmk9YWr';

        try {
            // 1. Send via EmailJS
            const result = await emailjs.send(
                serviceID,
                templateID,
                {
                    from_name: name,
                    from_email: email,
                    message: message,
                    to_name: 'Tony Mrxz',
                },
                publicKey
            );

            if (result.status === 200) {
                setStatus('success');

                // 2. Open WhatsApp for immediate chat
                const encodedMessage = encodeURIComponent(`Hi, I'm ${name} (${email}).\n\n${message}`);
                window.open(`https://wa.me/918914064945?text=${encodedMessage}`, '_blank');

                // Clear form
                setName('');
                setEmail('');
                setMessage('');

                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('EmailJS error:', error);
            setStatus('error');
        }
    };

    return (
        <motion.div
            className="min-h-screen bg-black text-white pt-28 md:pt-16 pb-24 px-8 md:px-16 lg:px-32"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className="max-w-4xl mx-auto">
                {/* Page Title */}
                <motion.h1
                    className="text-2xl md:text-3xl text-white/90 font-light tracking-[0.3em] uppercase mb-12 text-center"
                    style={{ fontFamily: "'Kanit', sans-serif" }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    Get in Touch
                </motion.h1>
                <motion.p
                    className="text-white/40 text-center mb-16 max-w-md mx-auto text-sm"
                    style={{ fontFamily: "'Kanit', sans-serif" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Have a project in mind or just want to say hello? Drop me a message.
                </motion.p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <motion.form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <EliteInput icon={User} placeholder="Your Name" value={name} onChange={setName} />
                        <EliteInput icon={Mail} placeholder="Your Email" type="email" value={email} onChange={setEmail} />
                        <EliteInput icon={MessageSquare} placeholder="Your Message" value={message} onChange={setMessage} multiline />

                        <motion.button
                            type="submit"
                            disabled={status === 'submitting' || status === 'success'}
                            className={`w-full py-4 px-8 rounded-2xl font-medium uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3 transition-all duration-300 ${status === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                                status === 'error' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                                    'bg-white text-black hover:bg-white/90'
                                }`}
                            style={{ fontFamily: "'Kanit', sans-serif" }}
                            whileHover={status === 'idle' ? { scale: 1.02 } : {}}
                            whileTap={status === 'idle' ? { scale: 0.98 } : {}}
                        >
                            {status === 'submitting' ? (
                                <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                            ) : status === 'success' ? (
                                <>✓ Message Sent</>
                            ) : status === 'error' ? (
                                <>Try Again</>
                            ) : (
                                <>
                                    <Send size={18} />
                                    Send Message
                                </>
                            )}
                        </motion.button>
                    </motion.form>

                    {/* Social Links */}
                    <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <h3
                            className="text-white/60 text-sm uppercase tracking-[0.2em] mb-6"
                            style={{ fontFamily: "'Kanit', sans-serif" }}
                        >
                            Or connect with me
                        </h3>
                        <SocialButton
                            icon={Instagram}
                            href="https://www.instagram.com/musicu.mrxz/"
                            label="Instagram"
                            color="group-hover:text-[#FF0069]"
                        />
                        <SocialButton
                            icon={Linkedin}
                            href="https://www.linkedin.com/in/tonymrxz/"
                            label="LinkedIn"
                            color="group-hover:text-[#0A66C2]"
                        />
                        <SocialButton
                            icon={DiscordIcon}
                            href="https://discord.com/users/991322990186876928"
                            label="Discord"
                            color="group-hover:text-[#5865F2]"
                        />
                        <SocialButton
                            icon={Github}
                            href="https://github.com/Tony-Mrxz"
                            label="Github"
                            color="group-hover:text-white"
                        />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default Contact;
