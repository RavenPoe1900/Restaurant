import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { Public } from '../domain/public.decorator';
import { AuthService } from '../application/auth.service';
import { LoginDto } from '../domain/login.dto';
import {
  Payload,
  RequestUser,
} from 'src/_shared/domain/interface/request-user';
import { SignUpDto } from '../domain/signUp.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponseSwagger } from 'src/_shared/infrastructure/swagger/response.swagger';
import { genericSwagger } from 'src/_shared/infrastructure/swagger/http.swagger';
import { LoginResponseDto } from '../domain/loginResponse.dto';
import { SignUpResponseDto } from '../domain/signUpResponse.dto';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Authenticates a user.
   * @param credentials DTO containing the user's login credentials.
   * @returns The authentication token and user information or an error.
   */
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(
    genericSwagger(LoginResponseDto, 'Login', 'Return accesstoken')
  )
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  /**
   * Registers a new user.
   * @param body DTO containing the user's registration information.
   * @returns The created user information or an error.
   */
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(
    genericSwagger(SignUpResponseDto, 'Sign Up', 'Return access token')
  )
  @Post('signUp')
  signUp(@Body() signUpDto: SignUpDto): Promise<SignUpResponseDto> {
    return this.authService.signUp(signUpDto);
  }

  /**
   * Retrieves or updates the user profile.
   * @param userId The ID of the user whose profile is being accessed or updated.
   * @param body Optional DTO containing the updated profile information.
   * @returns The user profile information or an error.
   */
  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(
    genericSwagger(SignUpResponseDto, 'Profile', 'Return Profile')
  )
  @Get('profile')
  getProfile(@Request() req: RequestUser): Payload {
    return req.user;
  }
}
