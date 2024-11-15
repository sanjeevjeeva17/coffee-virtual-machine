import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private admins = [
    { email: 'admin1@example.com', password: 'password1' },
    { email: 'admin2@example.com', password: 'password2' },
    { email: 'admin3@example.com', password: 'password3' },
  ];

  constructor(private readonly jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const admin = this.admins.find(admin => admin.email === email && admin.password === password);
    if (admin) {
      return { email: admin.email };
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(email: string, password: string): Promise<any> {
    const user = await this.validateUser(email, password);
    const payload = { email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      user: user.email
    };
  }
}
