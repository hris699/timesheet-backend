class AuthController {
    constructor(userModel, jwtUtils) {
        this.userModel = userModel;
        this.jwtUtils = jwtUtils;
    }

    async login(req, res) {
        let { email, password } = req.body;
        email = email?.trim().toLowerCase();
        try {
            const user = await this.userModel.findOne({ email });
            if (!user || !(await user.comparePassword(password))) {
                console.warn(`[WARN] Failed login attempt for email: ${email}`);
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = this.jwtUtils.generateToken(user);
            res.json({ token });
        } catch (error) {
            console.error(`[ERROR] Login error for email: ${email} -`, error);
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }

    async register(req, res) {
        let { email, password, role, recruiter } = req.body;
        email = email?.trim().toLowerCase();
        try {
            // If registering a contractor, recruiter must be provided
            if (role === 'Contractor' && !recruiter) {
                return res.status(400).json({ message: 'Recruiter is required for contractor registration.' });
            }
            const newUser = new this.userModel({ email, password, role, recruiter });
            await newUser.save();
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            if (error.code === 11000) {
                console.warn(`[WARN] Registration failed: Duplicate email: ${email}`);
                return res.status(400).json({ message: 'Email already exists' });
            }
            console.error(`[ERROR] Registration error for email: ${email} -`, error);
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
}

export default AuthController;