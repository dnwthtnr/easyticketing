	.file	"main.cpp"
	.text
	.local	_ZStL8__ioinit
	.comm	_ZStL8__ioinit,1,1
	.section	.rodata
	.align 4
	.type	_ZL9SCR_WIDTH, @object
	.size	_ZL9SCR_WIDTH, 4
_ZL9SCR_WIDTH:
	.long	800
	.align 4
	.type	_ZL10SCR_HEIGHT, @object
	.size	_ZL10SCR_HEIGHT, 4
_ZL10SCR_HEIGHT:
	.long	600
	.globl	vertexShaderSource
	.align 8
.LC0:
	.string	"#version 330 core\nlayout (location = 0) in vec3 aPos;\nvoid main()\n{\n   gl_Position = vec4(aPos.x, aPos.y, aPos.z, 1.0);\n}"
	.string	""
	.section	.data.rel.local,"aw"
	.align 8
	.type	vertexShaderSource, @object
	.size	vertexShaderSource, 8
vertexShaderSource:
	.quad	.LC0
	.globl	fragmentShaderSource
	.section	.rodata
	.align 8
.LC1:
	.string	"#version 330 core\nout vec4 FragColor;\nvoid main()\n{\n   FragColor = vec4(1.0f, 0.5f, 0.2f, 1.0f);\n}\n"
	.string	""
	.section	.data.rel.local
	.align 8
	.type	fragmentShaderSource, @object
	.size	fragmentShaderSource, 8
fragmentShaderSource:
	.quad	.LC1
	.section	.rodata
.LC2:
	.string	"LearnOpenGL"
.LC3:
	.string	"Failed to create GLFW window"
.LC4:
	.string	"Failed to initialize GLAD"
	.align 8
.LC5:
	.string	"ERROR::SHADER::VERTEX::COMPILATION_FAILED\n"
	.align 8
.LC6:
	.string	"ERROR::SHADER::FRAGMENT::COMPILATION_FAILED\n"
	.align 8
.LC7:
	.string	"ERROR::SHADER::PROGRAM::LINKING_FAILED\n"
	.text
	.globl	main
	.type	main, @function
main:
.LFB1731:
	.cfi_startproc
	endbr64
	pushq	%rbp
	.cfi_def_cfa_offset 16
	.cfi_offset 6, -16
	movq	%rsp, %rbp
	.cfi_def_cfa_register 6
	subq	$608, %rsp
	movq	%fs:40, %rax
	movq	%rax, -8(%rbp)
	xorl	%eax, %eax
	call	glfwInit@PLT
	movl	$3, %esi
	movl	$139266, %edi
	call	glfwWindowHint@PLT
	movl	$3, %esi
	movl	$139267, %edi
	call	glfwWindowHint@PLT
	movl	$204801, %esi
	movl	$139272, %edi
	call	glfwWindowHint@PLT
	movl	$0, %r8d
	movl	$0, %ecx
	leaq	.LC2(%rip), %rax
	movq	%rax, %rdx
	movl	$600, %esi
	movl	$800, %edi
	call	glfwCreateWindow@PLT
	movq	%rax, -584(%rbp)
	cmpq	$0, -584(%rbp)
	jne	.L2
	leaq	.LC3(%rip), %rax
	movq	%rax, %rsi
	leaq	_ZSt4cout(%rip), %rax
	movq	%rax, %rdi
	call	_ZStlsISt11char_traitsIcEERSt13basic_ostreamIcT_ES5_PKc@PLT
	movq	_ZSt4endlIcSt11char_traitsIcEERSt13basic_ostreamIT_T0_ES6_@GOTPCREL(%rip), %rdx
	movq	%rdx, %rsi
	movq	%rax, %rdi
	call	_ZNSolsEPFRSoS_E@PLT
	call	glfwTerminate@PLT
	movl	$-1, %eax
	jmp	.L10
.L2:
	movq	-584(%rbp), %rax
	movq	%rax, %rdi
	call	glfwMakeContextCurrent@PLT
	movq	-584(%rbp), %rax
	leaq	_Z25framebuffer_size_callbackP10GLFWwindowii(%rip), %rdx
	movq	%rdx, %rsi
	movq	%rax, %rdi
	call	glfwSetFramebufferSizeCallback@PLT
	movq	glfwGetProcAddress@GOTPCREL(%rip), %rax
	movq	%rax, %rdi
	call	gladLoadGLLoader@PLT
	testl	%eax, %eax
	sete	%al
	testb	%al, %al
	je	.L4
	leaq	.LC4(%rip), %rax
	movq	%rax, %rsi
	leaq	_ZSt4cout(%rip), %rax
	movq	%rax, %rdi
	call	_ZStlsISt11char_traitsIcEERSt13basic_ostreamIcT_ES5_PKc@PLT
	movq	_ZSt4endlIcSt11char_traitsIcEERSt13basic_ostreamIT_T0_ES6_@GOTPCREL(%rip), %rdx
	movq	%rdx, %rsi
	movq	%rax, %rdi
	call	_ZNSolsEPFRSoS_E@PLT
	movl	$-1, %eax
	jmp	.L10
.L4:
	movq	glad_glCreateShader(%rip), %rax
	movl	$35633, %edi
	call	*%rax
	movl	%eax, -596(%rbp)
	movq	glad_glShaderSource(%rip), %r8
	movl	-596(%rbp), %eax
	movl	$0, %ecx
	leaq	vertexShaderSource(%rip), %rdx
	movl	$1, %esi
	movl	%eax, %edi
	call	*%r8
	movq	glad_glCompileShader(%rip), %rdx
	movl	-596(%rbp), %eax
	movl	%eax, %edi
	call	*%rdx
	movq	glad_glGetShaderiv(%rip), %rcx
	leaq	-608(%rbp), %rdx
	movl	-596(%rbp), %eax
	movl	$35713, %esi
	movl	%eax, %edi
	call	*%rcx
	movl	-608(%rbp), %eax
	testl	%eax, %eax
	jne	.L5
	movq	glad_glGetShaderInfoLog(%rip), %r8
	leaq	-528(%rbp), %rdx
	movl	-596(%rbp), %eax
	movq	%rdx, %rcx
	movl	$0, %edx
	movl	$512, %esi
	movl	%eax, %edi
	call	*%r8
	leaq	.LC5(%rip), %rax
	movq	%rax, %rsi
	leaq	_ZSt4cout(%rip), %rax
	movq	%rax, %rdi
	call	_ZStlsISt11char_traitsIcEERSt13basic_ostreamIcT_ES5_PKc@PLT
	movq	%rax, %rdx
	leaq	-528(%rbp), %rax
	movq	%rax, %rsi
	movq	%rdx, %rdi
	call	_ZStlsISt11char_traitsIcEERSt13basic_ostreamIcT_ES5_PKc@PLT
	movq	_ZSt4endlIcSt11char_traitsIcEERSt13basic_ostreamIT_T0_ES6_@GOTPCREL(%rip), %rdx
	movq	%rdx, %rsi
	movq	%rax, %rdi
	call	_ZNSolsEPFRSoS_E@PLT
.L5:
	movq	glad_glCreateShader(%rip), %rax
	movl	$35632, %edi
	call	*%rax
	movl	%eax, -592(%rbp)
	movq	glad_glShaderSource(%rip), %r8
	movl	-592(%rbp), %eax
	movl	$0, %ecx
	leaq	fragmentShaderSource(%rip), %rdx
	movl	$1, %esi
	movl	%eax, %edi
	call	*%r8
	movq	glad_glCompileShader(%rip), %rdx
	movl	-592(%rbp), %eax
	movl	%eax, %edi
	call	*%rdx
	movq	glad_glGetShaderiv(%rip), %rcx
	leaq	-608(%rbp), %rdx
	movl	-592(%rbp), %eax
	movl	$35713, %esi
	movl	%eax, %edi
	call	*%rcx
	movl	-608(%rbp), %eax
	testl	%eax, %eax
	jne	.L6
	movq	glad_glGetShaderInfoLog(%rip), %r8
	leaq	-528(%rbp), %rdx
	movl	-592(%rbp), %eax
	movq	%rdx, %rcx
	movl	$0, %edx
	movl	$512, %esi
	movl	%eax, %edi
	call	*%r8
	leaq	.LC6(%rip), %rax
	movq	%rax, %rsi
	leaq	_ZSt4cout(%rip), %rax
	movq	%rax, %rdi
	call	_ZStlsISt11char_traitsIcEERSt13basic_ostreamIcT_ES5_PKc@PLT
	movq	%rax, %rdx
	leaq	-528(%rbp), %rax
	movq	%rax, %rsi
	movq	%rdx, %rdi
	call	_ZStlsISt11char_traitsIcEERSt13basic_ostreamIcT_ES5_PKc@PLT
	movq	_ZSt4endlIcSt11char_traitsIcEERSt13basic_ostreamIT_T0_ES6_@GOTPCREL(%rip), %rdx
	movq	%rdx, %rsi
	movq	%rax, %rdi
	call	_ZNSolsEPFRSoS_E@PLT
.L6:
	movq	glad_glCreateProgram(%rip), %rax
	call	*%rax
	movl	%eax, -588(%rbp)
	movq	glad_glAttachShader(%rip), %rcx
	movl	-596(%rbp), %edx
	movl	-588(%rbp), %eax
	movl	%edx, %esi
	movl	%eax, %edi
	call	*%rcx
	movq	glad_glAttachShader(%rip), %rcx
	movl	-592(%rbp), %edx
	movl	-588(%rbp), %eax
	movl	%edx, %esi
	movl	%eax, %edi
	call	*%rcx
	movq	glad_glLinkProgram(%rip), %rdx
	movl	-588(%rbp), %eax
	movl	%eax, %edi
	call	*%rdx
	movq	glad_glGetProgramiv(%rip), %rcx
	leaq	-608(%rbp), %rdx
	movl	-588(%rbp), %eax
	movl	$35714, %esi
	movl	%eax, %edi
	call	*%rcx
	movl	-608(%rbp), %eax
	testl	%eax, %eax
	jne	.L7
	movq	glad_glGetProgramInfoLog(%rip), %r8
	leaq	-528(%rbp), %rdx
	movl	-588(%rbp), %eax
	movq	%rdx, %rcx
	movl	$0, %edx
	movl	$512, %esi
	movl	%eax, %edi
	call	*%r8
	leaq	.LC7(%rip), %rax
	movq	%rax, %rsi
	leaq	_ZSt4cout(%rip), %rax
	movq	%rax, %rdi
	call	_ZStlsISt11char_traitsIcEERSt13basic_ostreamIcT_ES5_PKc@PLT
	movq	%rax, %rdx
	leaq	-528(%rbp), %rax
	movq	%rax, %rsi
	movq	%rdx, %rdi
	call	_ZStlsISt11char_traitsIcEERSt13basic_ostreamIcT_ES5_PKc@PLT
	movq	_ZSt4endlIcSt11char_traitsIcEERSt13basic_ostreamIT_T0_ES6_@GOTPCREL(%rip), %rdx
	movq	%rdx, %rsi
	movq	%rax, %rdi
	call	_ZNSolsEPFRSoS_E@PLT
.L7:
	movq	glad_glDeleteShader(%rip), %rdx
	movl	-596(%rbp), %eax
	movl	%eax, %edi
	call	*%rdx
	movq	glad_glDeleteShader(%rip), %rdx
	movl	-592(%rbp), %eax
	movl	%eax, %edi
	call	*%rdx
	movss	.LC8(%rip), %xmm0
	movss	%xmm0, -576(%rbp)
	movss	.LC8(%rip), %xmm0
	movss	%xmm0, -572(%rbp)
	pxor	%xmm0, %xmm0
	movss	%xmm0, -568(%rbp)
	movss	.LC10(%rip), %xmm0
	movss	%xmm0, -564(%rbp)
	movss	.LC8(%rip), %xmm0
	movss	%xmm0, -560(%rbp)
	pxor	%xmm0, %xmm0
	movss	%xmm0, -556(%rbp)
	pxor	%xmm0, %xmm0
	movss	%xmm0, -552(%rbp)
	movss	.LC10(%rip), %xmm0
	movss	%xmm0, -548(%rbp)
	pxor	%xmm0, %xmm0
	movss	%xmm0, -544(%rbp)
	movq	glad_glGenVertexArrays(%rip), %rdx
	leaq	-600(%rbp), %rax
	movq	%rax, %rsi
	movl	$1, %edi
	call	*%rdx
	movq	glad_glGenBuffers(%rip), %rdx
	leaq	-604(%rbp), %rax
	movq	%rax, %rsi
	movl	$1, %edi
	call	*%rdx
	movq	glad_glBindVertexArray(%rip), %rdx
	movl	-600(%rbp), %eax
	movl	%eax, %edi
	call	*%rdx
	movq	glad_glBindBuffer(%rip), %rdx
	movl	-604(%rbp), %eax
	movl	%eax, %esi
	movl	$34962, %edi
	call	*%rdx
	movq	glad_glBufferData(%rip), %r8
	leaq	-576(%rbp), %rax
	movl	$35044, %ecx
	movq	%rax, %rdx
	movl	$36, %esi
	movl	$34962, %edi
	call	*%r8
	movq	glad_glVertexAttribPointer(%rip), %rax
	movl	$0, %r9d
	movl	$12, %r8d
	movl	$0, %ecx
	movl	$5126, %edx
	movl	$3, %esi
	movl	$0, %edi
	call	*%rax
	movq	glad_glEnableVertexAttribArray(%rip), %rax
	movl	$0, %edi
	call	*%rax
	movq	glad_glBindBuffer(%rip), %rax
	movl	$0, %esi
	movl	$34962, %edi
	call	*%rax
	movq	glad_glBindVertexArray(%rip), %rax
	movl	$0, %edi
	call	*%rax
	jmp	.L8
.L9:
	movq	-584(%rbp), %rax
	movq	%rax, %rdi
	call	_Z12processInputP10GLFWwindow
	movq	glad_glClearColor(%rip), %rdx
	movss	.LC11(%rip), %xmm3
	movss	.LC12(%rip), %xmm2
	movss	.LC12(%rip), %xmm1
	movl	.LC13(%rip), %eax
	movd	%eax, %xmm0
	call	*%rdx
	movq	glad_glClear(%rip), %rax
	movl	$16384, %edi
	call	*%rax
	movq	glad_glUseProgram(%rip), %rdx
	movl	-588(%rbp), %eax
	movl	%eax, %edi
	call	*%rdx
	movq	glad_glBindVertexArray(%rip), %rdx
	movl	-600(%rbp), %eax
	movl	%eax, %edi
	call	*%rdx
	movq	glad_glDrawArrays(%rip), %rax
	movl	$3, %edx
	movl	$0, %esi
	movl	$4, %edi
	call	*%rax
	movq	-584(%rbp), %rax
	movq	%rax, %rdi
	call	glfwSwapBuffers@PLT
	call	glfwPollEvents@PLT
.L8:
	movq	-584(%rbp), %rax
	movq	%rax, %rdi
	call	glfwWindowShouldClose@PLT
	testl	%eax, %eax
	sete	%al
	testb	%al, %al
	jne	.L9
	movq	glad_glDeleteVertexArrays(%rip), %rdx
	leaq	-600(%rbp), %rax
	movq	%rax, %rsi
	movl	$1, %edi
	call	*%rdx
	movq	glad_glDeleteBuffers(%rip), %rdx
	leaq	-604(%rbp), %rax
	movq	%rax, %rsi
	movl	$1, %edi
	call	*%rdx
	movq	glad_glDeleteProgram(%rip), %rdx
	movl	-588(%rbp), %eax
	movl	%eax, %edi
	call	*%rdx
	call	glfwTerminate@PLT
	movl	$0, %eax
.L10:
	movq	-8(%rbp), %rdx
	subq	%fs:40, %rdx
	je	.L11
	call	__stack_chk_fail@PLT
.L11:
	leave
	.cfi_def_cfa 7, 8
	ret
	.cfi_endproc
.LFE1731:
	.size	main, .-main
	.globl	_Z12processInputP10GLFWwindow
	.type	_Z12processInputP10GLFWwindow, @function
_Z12processInputP10GLFWwindow:
.LFB1732:
	.cfi_startproc
	endbr64
	pushq	%rbp
	.cfi_def_cfa_offset 16
	.cfi_offset 6, -16
	movq	%rsp, %rbp
	.cfi_def_cfa_register 6
	subq	$16, %rsp
	movq	%rdi, -8(%rbp)
	movq	-8(%rbp), %rax
	movl	$256, %esi
	movq	%rax, %rdi
	call	glfwGetKey@PLT
	cmpl	$1, %eax
	sete	%al
	testb	%al, %al
	je	.L14
	movq	-8(%rbp), %rax
	movl	$1, %esi
	movq	%rax, %rdi
	call	glfwSetWindowShouldClose@PLT
.L14:
	nop
	leave
	.cfi_def_cfa 7, 8
	ret
	.cfi_endproc
.LFE1732:
	.size	_Z12processInputP10GLFWwindow, .-_Z12processInputP10GLFWwindow
	.globl	_Z25framebuffer_size_callbackP10GLFWwindowii
	.type	_Z25framebuffer_size_callbackP10GLFWwindowii, @function
_Z25framebuffer_size_callbackP10GLFWwindowii:
.LFB1733:
	.cfi_startproc
	endbr64
	pushq	%rbp
	.cfi_def_cfa_offset 16
	.cfi_offset 6, -16
	movq	%rsp, %rbp
	.cfi_def_cfa_register 6
	subq	$16, %rsp
	movq	%rdi, -8(%rbp)
	movl	%esi, -12(%rbp)
	movl	%edx, -16(%rbp)
	movq	glad_glViewport(%rip), %r8
	movl	-16(%rbp), %edx
	movl	-12(%rbp), %eax
	movl	%edx, %ecx
	movl	%eax, %edx
	movl	$0, %esi
	movl	$0, %edi
	call	*%r8
	nop
	leave
	.cfi_def_cfa 7, 8
	ret
	.cfi_endproc
.LFE1733:
	.size	_Z25framebuffer_size_callbackP10GLFWwindowii, .-_Z25framebuffer_size_callbackP10GLFWwindowii
	.type	_Z41__static_initialization_and_destruction_0ii, @function
_Z41__static_initialization_and_destruction_0ii:
.LFB2236:
	.cfi_startproc
	endbr64
	pushq	%rbp
	.cfi_def_cfa_offset 16
	.cfi_offset 6, -16
	movq	%rsp, %rbp
	.cfi_def_cfa_register 6
	subq	$16, %rsp
	movl	%edi, -4(%rbp)
	movl	%esi, -8(%rbp)
	cmpl	$1, -4(%rbp)
	jne	.L18
	cmpl	$65535, -8(%rbp)
	jne	.L18
	leaq	_ZStL8__ioinit(%rip), %rax
	movq	%rax, %rdi
	call	_ZNSt8ios_base4InitC1Ev@PLT
	leaq	__dso_handle(%rip), %rax
	movq	%rax, %rdx
	leaq	_ZStL8__ioinit(%rip), %rax
	movq	%rax, %rsi
	movq	_ZNSt8ios_base4InitD1Ev@GOTPCREL(%rip), %rax
	movq	%rax, %rdi
	call	__cxa_atexit@PLT
.L18:
	nop
	leave
	.cfi_def_cfa 7, 8
	ret
	.cfi_endproc
.LFE2236:
	.size	_Z41__static_initialization_and_destruction_0ii, .-_Z41__static_initialization_and_destruction_0ii
	.type	_GLOBAL__sub_I_vertexShaderSource, @function
_GLOBAL__sub_I_vertexShaderSource:
.LFB2237:
	.cfi_startproc
	endbr64
	pushq	%rbp
	.cfi_def_cfa_offset 16
	.cfi_offset 6, -16
	movq	%rsp, %rbp
	.cfi_def_cfa_register 6
	movl	$65535, %esi
	movl	$1, %edi
	call	_Z41__static_initialization_and_destruction_0ii
	popq	%rbp
	.cfi_def_cfa 7, 8
	ret
	.cfi_endproc
.LFE2237:
	.size	_GLOBAL__sub_I_vertexShaderSource, .-_GLOBAL__sub_I_vertexShaderSource
	.section	.init_array,"aw"
	.align 8
	.quad	_GLOBAL__sub_I_vertexShaderSource
	.section	.rodata
	.align 4
.LC8:
	.long	-1090519040
	.align 4
.LC10:
	.long	1056964608
	.align 4
.LC11:
	.long	1065353216
	.align 4
.LC12:
	.long	1050253722
	.align 4
.LC13:
	.long	1045220557
	.hidden	__dso_handle
	.ident	"GCC: (Ubuntu 11.4.0-1ubuntu1~22.04) 11.4.0"
	.section	.note.GNU-stack,"",@progbits
	.section	.note.gnu.property,"a"
	.align 8
	.long	1f - 0f
	.long	4f - 1f
	.long	5
0:
	.string	"GNU"
1:
	.align 8
	.long	0xc0000002
	.long	3f - 2f
2:
	.long	0x3
3:
	.align 8
4:
