import { motion } from 'framer-motion';
import { Outlet, Navigate } from 'react-router-dom';

const AuthLayout = () => {
    const isAuthenticated = false;

    return (
        <>
            {isAuthenticated ? (
                <Navigate to="/" />
            ) : (
                <div className="select-none backdrop-filter backdrop-blur-xl h-dvh drag-none flex flex-row w-screen overflow-y-auto">
                    <motion.div
                        style={{
                            width: '100vw',
                            height: '100vh',
                            backgroundSize: 'cover',
                            position: 'absolute',
                            zIndex: 10,
                        }}
                        animate={{
                            backgroundImage: [
                                `radial-gradient(at 100% 0%, hsla(45,98%,43%, 0.5) 0px, transparent 50%),
                                radial-gradient(at 0% 100%, hsla(52,99%,47%, 0.5) 0px, transparent 50%)`,

                                `radial-gradient(at 100% 0%, hsla(45,98%,43%, 1) 0px, transparent 50%),
                                radial-gradient(at 0% 100%, hsla(52,99%,47%, 1) 0px, transparent 50%)`,

                                `radial-gradient(at 100% 0%, hsla(45,98%,43%, 0.5) 0px, transparent 50%),
                                radial-gradient(at 0% 100%, hsla(52,99%,47%, 0.5) 0px, transparent 50%)`,
                            ],
                        }}
                        transition={{
                            duration: 4,
                            ease: 'easeInOut',
                            repeat: Infinity,
                            repeatDelay: 1,
                        }}
                        className="fixed inset-0"
                    />
                    <section className="flex z-20 flex-1 justify-center items-center py-10 overflow-y-auto">
                        <div className='bg-muted/60 mx-3 lg:mx-0 backdrop-filter backdrop-blur-none rounded-xl p-5'>
                            <img src="logo.png" width={400} alt="Logo" />
                            <Outlet />
                        </div>
                    </section>
                </div>
            )}
        </>
    );
};

export default AuthLayout;