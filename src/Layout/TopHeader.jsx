const TopHeader = () => {
    return (
        <>
            <div className="w-full sticky top-0 z-50">
                <nav className="w-full py-3 backdrop-blur-md bg-white/70 border-b border-gray-200 shadow-sm">
                    
                    <div className="container mx-auto">
                        <div className="flex justify-between items-center px-5">
                            
                            {/* Left Content */}
                            <div>
                                <p className="text-gray-400 text-sm">Hello 👋</p>
                                <h4 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">
                                    Welcome Back!
                                </h4>
                            </div>

                            {/* Right Side (optional profile future use) */}
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold shadow-md">
                                M
                            </div>

                        </div>
                    </div>

                </nav>
            </div>
        </>
    );
};

export default TopHeader;