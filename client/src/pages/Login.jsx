import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useLoginUserMutation, useRegisterUserMutation } from "@/features/api/authApi"
import { Loader2 } from "lucide-react"
import { useState } from "react"

const Login = () => {
    const [loginInput, setLoginInput] = useState({
        email: "",
        password: "",
    })
    const [signupInput, setSignupInput] = useState({
        name: "",
        email: "",
        password: "",
    })

    const [registerUser, { data: registerData, error: registerError, isLoading: registerIsLoading, isSuccess: registerIsSuccess }] = useRegisterUserMutation()
    const [loginUser, { data: loginData, error: loginError, isLoading: loginIsLoading, isSuccess: loginIsSuccess }] = useLoginUserMutation();

    const changeInputHandler = (e, type) => {
        const { name, value } = e.target;
        if (type === "signup") {
            setSignupInput((prev) => ({
                ...prev,
                [name]: value,
            }))
        } else {
            setLoginInput((prev) => ({
                ...prev,
                [name]: value,
            }))
        }
    }

    const handleRegistration = async(type) => {
        const inputData=type==="signup"?signupInput:loginInput
        const action=type==="signup"?registerUser:loginUser
        await action(inputData)

    }
    return (
        <div className="flex items-center justify-center w-full h-full">
            <Tabs defaultValue="signup" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    <TabsTrigger value="login">Login</TabsTrigger>
                </TabsList>
                <TabsContent value="signup">
                    <Card>
                        <CardHeader>
                            <CardTitle>Sign Up</CardTitle>
                            <CardDescription>
                                Create New Account. After saving, you'll be logged in.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="name">Name</Label>
                                <Input type="text" name="name" placeholder="Pedro Duarte" required="true"
                                    onChange={(e) => changeInputHandler(e, "signup")}
                                    value={signupInput.name}
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input type="email"
                                    name="email"
                                    placeholder="abc@gmail.com" required="true" onChange={(e) => changeInputHandler(e, "signup")}
                                    value={signupInput.email}
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="">Password</Label>
                                <Input type="password"
                                    name="password" required="true" onChange={(e) => changeInputHandler(e, "signup")}
                                    value={signupInput.password}
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button disabled={registerIsLoading} onClick={() => handleRegistration("signup")}>
                                {
                                    registerIsLoading?(
                                        <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please Wait
                                        </>
                                    )
                                    :"Sign Up"
                                    
                                }
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="login">
                    <Card>
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                            <CardDescription>
                                Login to your account. After saving, you'll be logged in.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="current">Email</Label>
                                <Input type="email" placeholder="abc@gmail.com" required="true"
                                    name="email"
                                    onChange={(e) => changeInputHandler(e, "login")}
                                    value={loginInput.email}
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="new"> password</Label>
                                <Input type="password"
                                    name="password" required="true" onChange={(e) => changeInputHandler(e, "login")}
                                    value={loginInput.password}
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button disabled={loginIsLoading} onClick={() => handleRegistration("login")}>
                                {
                                    loginIsLoading?(
                                        <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please Wait
                                        </>
                                    )
                                    :"Login"
                                }
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
export default Login
