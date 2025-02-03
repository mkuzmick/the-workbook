# **DeepSeek's Use of PTX Instead of CUDA: A Threat to NVIDIA?**

DeepSeek, a Chinese AI company, recently made headlines by training its massive 671-billion parameter language model with significantly higher efficiency than industry giants like Meta. This was achieved through various optimizations, including the use of NVIDIA's PTX (Parallel Thread Execution) instead of the more common CUDA programming language. This has led to questions about the implications of DeepSeek's approach for NVIDIA. Is it a threat to NVIDIA's dominance in the AI chip market? Let's delve deeper.

## **What is NVIDIA PTX and How Does it Relate to CUDA?**

PTX, or Parallel Thread Execution, is a low-level intermediate representation and instruction set architecture (ISA) developed by NVIDIA for their GPUs. It serves as a bridge between higher-level programming languages like CUDA C/C++ and the low-level machine code (SASS) that the GPUs actually execute. You can think of it as an assembly-like language specifically designed for parallel processing on NVIDIA GPUs 1. CUDA code is typically compiled into PTX, which is then further compiled into SASS by the GPU driver 1.

One way to understand PTX is as "CUDA IR" (Intermediate Representation) 2. Similar to how LLVM IR acts as an intermediary between various programming languages and different hardware architectures, PTX connects CUDA C++ to the underlying GPU hardware. This allows for optimizations and runtime adjustments through tools like NVRTC.

Another way to view PTX is as a low-level ISA that provides fine-grained control over the GPU's hardware 2. This is where its power lies. PTX exposes the GPU as a data-parallel computing device, enabling developers to perform optimizations that are not possible with higher-level languages like CUDA C/C++. This includes precise control over register allocation and adjustments at the thread/warp level 3.

PTX supports a variety of data types, including scalar types like integers and floating-point numbers, vector types with multiple elements, aggregates like structures and arrays, and unions 4. It also includes support for bit fields, which are allocated in memory from right to left (least to most significant) for little-endian architectures 4.

Furthermore, PTX provides mechanisms for accessing texture and surface memory. Texture references are bound to read-only memory regions called texture memory, while surface references allow for reading and writing data to surface memory 4. These references are managed through descriptors allocated in memory, which are accessed by PTX instructions.

PTX also defines a function calling sequence, including register usage, parameter passing, and stack frame layout 4. At the PTX level, registers are virtual and are allocated during the translation to SASS. Parameters and return values are also converted to physical registers or stack locations during this translation process.

Shared memory, which is a crucial aspect of GPU programming, is declared in PTX using the .shared directive, along with alignment and size specifications 1. For example, .shared .align 8 .b8 pbatch\_cache\[15744\]; declares 15,744 bytes of shared memory aligned to an 8-byte boundary.

It's important to note that PTX is designed to be forward-compatible 5. This means that code written in PTX for a specific GPU architecture can run on future generations of NVIDIA GPUs with the same or higher compute capability. This forward compatibility is a significant advantage for developers, as it ensures their code can be reused and doesn't become obsolete with each new GPU release.

Interestingly, the GNU Compiler Collection (GCC) also has the capability to generate PTX code in the context of OpenMP offloading 1. OpenMP is an API for parallel programming on shared-memory systems, and GCC can leverage PTX to offload OpenMP tasks to NVIDIA GPUs. This highlights the versatility of PTX and its potential applications beyond CUDA.

PTX also plays a role in compiler optimizations. By providing a virtual ISA, PTX allows for most compiler optimizations to be performed at this level, simplifying the translation to different GPU architectures 6. This abstraction layer contributes to the efficiency and portability of CUDA code.

## **Other Companies or Projects Using PTX**

While DeepSeek's extensive use of PTX has garnered attention, they are not alone in leveraging this technology. Other companies and projects have also utilized PTX for specific optimizations. Here are a couple of examples:

* **ZLUDA:** This project aims to create a drop-in replacement for CUDA that works on AMD and Intel GPUs, achieving near-native performance. ZLUDA utilizes PTX as part of its implementation, demonstrating its potential for cross-platform GPU programming 7.  
* **CUDA-JIT:** This library simplifies the use of PTX by providing a wrapper for NVIDIA's NVRTC runtime compilation library. CUDA-JIT allows developers to generate and launch PTX code more easily, making it more accessible for runtime optimizations and dynamic code generation 8.

These examples illustrate that PTX has applications beyond DeepSeek's specific use case and can be a valuable tool for developers seeking to optimize GPU performance in various contexts.

## **Why Did DeepSeek Choose PTX over CUDA?**

DeepSeek opted for PTX to achieve a higher level of optimization and efficiency in training its AI model. By utilizing PTX, DeepSeek's engineers were able to fine-tune the execution of their code to a degree not achievable with CUDA 9. This highlights a key insight: significant performance gains can be achieved by pushing the boundaries of hardware optimization, even with existing GPUs 9.

DeepSeek employed several specific techniques to maximize performance:

* **Reconfiguring H800 GPUs:** DeepSeek reconfigured NVIDIA H800 GPUs, allocating a portion of the streaming multiprocessors for server-to-server communication. This was likely done to improve data transfer speeds and overcome potential bottlenecks 9.  
* **Implementing advanced pipeline algorithms:** DeepSeek implemented custom algorithms, potentially involving intricate thread/warp-level adjustments, to optimize the flow of data and tasks within the GPU 9.  
* **Reducing memory requirements:** DeepSeek employed techniques like "cold-start data" for pre-training, where they utilized data from prior models instead of starting from scratch. They also optimized memory usage during inference by processing long text sequences efficiently 10.  
* **Utilizing lower-precision numerical formats:** DeepSeek strategically used lower-precision formats like FP16 (16-bit floating point) where possible to reduce memory and bandwidth requirements 10.  
* **Employing DualPipe:** DeepSeek utilized a software technique called "DualPipe" to parallelize the routing of tokens to experts and the aggregation of results. This further contributed to reducing costs and improving efficiency 10.

These optimizations, while complex and challenging to maintain, resulted in a remarkable 10x boost in training efficiency 9. This allowed DeepSeek to train its large language model with fewer resources and in less time.

## **Advantages and Disadvantages of Using PTX**

Using PTX instead of CUDA presents a trade-off between performance and development complexity 11. Here's a closer look at the advantages and disadvantages:

| Advantages | Disadvantages |
| :---- | :---- |
| **Fine-grained control:** PTX provides more direct access to the GPU's hardware, enabling developers to implement low-level optimizations not possible with CUDA 9. This allows for precise control over resource allocation and execution flow. | **Increased complexity:** Writing and debugging PTX code requires a deep understanding of GPU architecture and assembly-like programming 13. This can be a significant barrier to entry for many developers. |
| **Performance improvements:** By carefully optimizing code at the PTX level, developers can achieve significant performance gains compared to using CUDA 9. This can be crucial for demanding applications like AI training. | **Higher development time:** Developing and optimizing PTX code is more time-consuming than working with CUDA 13. The need for low-level optimizations and manual code adjustments can significantly increase development effort. |
| **Portability:** PTX code is designed to be architecture-independent, meaning it can be reused across different generations of NVIDIA GPUs 4. This forward compatibility ensures that code doesn't become obsolete with new hardware releases. | **Maintenance challenges:** Maintaining and updating highly optimized PTX code can be difficult, especially as new GPU architectures emerge 13. Code may need to be adapted to take advantage of new hardware features or to address changes in the underlying architecture. |
| **Runtime Compilation:** PTX modules are loaded and JIT compiled for the necessary architecture at runtime using tools like NVRTC 11. This allows for dynamic optimization and adaptation to the specific GPU being used. NVRTC itself offers advantages such as not requiring NVCC on the user side and having lower compilation overhead compared to runtime calls to NVCC 8. | **Register Allocation Challenges:** While PTX offers fine-grained control over register allocation, the compiler (nvcc) can sometimes re-associate expressions to increase instruction-level parallelism (ILP), which may lead to suboptimal register usage 15. Developers need to be mindful of this behavior and potentially use techniques like launch\_bounds to control register usage effectively. |

## **Is DeepSeek a Threat to NVIDIA?**

DeepSeek's use of PTX and the resulting efficiency gains have raised concerns about potential threats to NVIDIA's business. The company's achievements even caused a temporary dip in the stock prices of companies like NVIDIA, as investors became concerned about the potential impact on the demand for high-performance AI chips 16. However, it's important to consider several factors that mitigate this perceived threat:

* **PTX is still NVIDIA technology:** DeepSeek's approach relies on NVIDIA's PTX, which is still within NVIDIA's ecosystem. This means DeepSeek's success is still tied to NVIDIA's hardware and technology 1. Their optimizations, while impressive, are ultimately built upon NVIDIA's foundation.  
* **Optimization challenges:** While DeepSeek achieved impressive results, their methods require significant expertise and effort. Replicating this level of optimization is not easy, and it may not be feasible for all AI developers 13. The complexity and specialized knowledge required for PTX optimization will likely limit its adoption to a subset of developers with specific performance needs 9.  
* **CUDA remains dominant:** CUDA is still the industry-standard for GPU programming, and it's unlikely to be replaced anytime soon. PTX is more of a niche approach for specialized optimization 9. Most developers will likely continue to rely on CUDA due to its ease of use and broad support.  
* **NVIDIA's response:** NVIDIA has acknowledged DeepSeek's achievements and even praised their work 16. This suggests NVIDIA is confident in its ability to maintain its position in the market. They see DeepSeek's approach as a validation of their technology's flexibility and potential for optimization.

Furthermore, the high demand for DeepSeek's AI model led to them temporarily restricting access to manage the load on their servers 16. This demonstrates the challenges of scaling AI services and the need for robust infrastructure, which NVIDIA is well-positioned to provide.

It's also worth noting that some experts have expressed concerns about the potential implications of DeepSeek's data storage policies, particularly the storage of user data on servers in China 16. This adds another layer of complexity to the DeepSeek story and highlights the importance of data security and privacy considerations in AI development.

## **NVIDIA's Response to DeepSeek**

NVIDIA has responded positively to DeepSeek's achievements, acknowledging the impressive efficiency gains they achieved. In a statement, NVIDIA praised DeepSeek's work, highlighting the potential for innovation within their ecosystem 16. This suggests that NVIDIA views DeepSeek's approach as a validation of their technology rather than a threat.

DeepSeek's work also involved developing all-to-all communication kernels at the PTX level, which better utilize Infiniband and NVLink bandwidth 17. This further demonstrates their commitment to optimizing performance and pushing the boundaries of what's possible with NVIDIA GPUs.

## **Conclusion**

DeepSeek's use of PTX instead of CUDA is a noteworthy development in the AI landscape. It demonstrates the potential for achieving significant performance gains through low-level optimization. However, it's crucial to understand that PTX is still part of NVIDIA's technology stack, and the challenges associated with PTX development and maintenance limit its widespread adoption. While DeepSeek's approach might inspire further innovation and optimization efforts, it's unlikely to displace CUDA or diminish NVIDIA's dominance in the AI chip market.

## **Synthesis**

DeepSeek's innovative use of PTX to optimize AI model training has sparked discussions about its implications for NVIDIA. While PTX offers advantages such as fine-grained control and potential for performance improvements, it also comes with increased complexity and development challenges. DeepSeek's success highlights the potential for pushing the boundaries of optimization with existing hardware, but it's unlikely to pose a major threat to NVIDIA's dominance in the AI chip market. PTX remains a niche approach for specialized optimization, and CUDA continues to be the industry standard for GPU programming.

DeepSeek's case might encourage other developers to explore PTX for performance optimization, potentially leading to a wider range of applications and tools that leverage PTX 7. This could further expand the PTX ecosystem and drive innovation in GPU programming. As the AI landscape continues to evolve, PTX could play an increasingly important role in enabling developers to extract maximum performance from NVIDIA GPUs.

#### **Works cited**

1\. Parallel Thread Execution \- Wikipedia, accessed February 1, 2025, [https://en.wikipedia.org/wiki/Parallel\_Thread\_Execution](https://en.wikipedia.org/wiki/Parallel_Thread_Execution)  
2\. Nvidia Tensor Core-Getting Started with MMA PTX Programming | by Bruce-Lee-LY, accessed February 1, 2025, [https://bruce-lee-ly.medium.com/nvidia-tensor-core-getting-started-with-mma-ptx-programming-508e44a6cb7d](https://bruce-lee-ly.medium.com/nvidia-tensor-core-getting-started-with-mma-ptx-programming-508e44a6cb7d)  
3\. DeepSeek's AI breakthrough bypasses Nvidia's industry-standard CUDA, uses assembly-like PTX programming instead | Dramatic optimizations do not come easy. : r/China \- Reddit, accessed February 1, 2025, [https://www.reddit.com/r/China/comments/1ic9lk0/deepseeks\_ai\_breakthrough\_bypasses\_nvidias/](https://www.reddit.com/r/China/comments/1ic9lk0/deepseeks_ai_breakthrough_bypasses_nvidias/)  
4\. 1\. Introduction — PTX Interoperability 12.8 documentation \- NVIDIA Docs, accessed February 1, 2025, [https://docs.nvidia.com/cuda/ptx-writers-guide-to-interoperability/index.html](https://docs.nvidia.com/cuda/ptx-writers-guide-to-interoperability/index.html)  
5\. What is Parallel Thread Execution? | GPU Glossary \- Modal, accessed February 1, 2025, [https://modal.com/gpu-glossary/device-software/parallel-thread-execution](https://modal.com/gpu-glossary/device-software/parallel-thread-execution)  
6\. PTX V-ISA? \- CUDA Programming and Performance \- NVIDIA Developer Forums, accessed February 1, 2025, [https://forums.developer.nvidia.com/t/ptx-v-isa/10464](https://forums.developer.nvidia.com/t/ptx-v-isa/10464)  
7\. CUDA \- Wikipedia, accessed February 1, 2025, [https://en.wikipedia.org/wiki/CUDA](https://en.wikipedia.org/wiki/CUDA)  
8\. CUDA JIT Compilation \- Medium, accessed February 1, 2025, [https://medium.com/gpgpu/cuda-jit-compilation-1fb4950c67bb](https://medium.com/gpgpu/cuda-jit-compilation-1fb4950c67bb)  
9\. DeepSeek's AI breakthrough bypasses industry-standard CUDA for some functions, uses Nvidia's assembly-like PTX programming instead | Tom's Hardware, accessed February 1, 2025, [https://www.tomshardware.com/tech-industry/artificial-intelligence/deepseeks-ai-breakthrough-bypasses-industry-standard-cuda-uses-assembly-like-ptx-programming-instead](https://www.tomshardware.com/tech-industry/artificial-intelligence/deepseeks-ai-breakthrough-bypasses-industry-standard-cuda-uses-assembly-like-ptx-programming-instead)  
10\. DeepSeek Creates Buying Opportunity for Nvidia Stock | by Beth Kindig | Jan, 2025, accessed February 1, 2025, [https://beth-kindig.medium.com/deepseek-creates-buying-opportunity-for-nvidia-stock-2f32a72fc4b7](https://beth-kindig.medium.com/deepseek-creates-buying-opportunity-for-nvidia-stock-2f32a72fc4b7)  
11\. CUDA UR Reference Document — Unified Runtime Specification documentation, accessed February 1, 2025, [https://oneapi-src.github.io/unified-runtime/core/CUDA.html](https://oneapi-src.github.io/unified-runtime/core/CUDA.html)  
12\. Developing PTX instead of CUDA for optimization. Is it make sense? \- Stack Overflow, accessed February 1, 2025, [https://stackoverflow.com/questions/22173304/developing-ptx-instead-of-cuda-for-optimization-is-it-make-sense](https://stackoverflow.com/questions/22173304/developing-ptx-instead-of-cuda-for-optimization-is-it-make-sense)  
13\. Unlocking GPU Performance: How Handwritten PTX Code Enhances CUDA Kernels, accessed February 1, 2025, [https://sasmaster.medium.com/unlocking-gpu-performance-how-handwritten-ptx-code-enhances-cuda-kernels-8cbf2c766ba3](https://sasmaster.medium.com/unlocking-gpu-performance-how-handwritten-ptx-code-enhances-cuda-kernels-8cbf2c766ba3)  
14\. DeepSeek's AI Breakthrough Bypasses Nvidia's Industry-Standard CUDA, Uses Assembly-Like PTX Programming Instead : r/technology \- Reddit, accessed February 1, 2025, [https://www.reddit.com/r/technology/comments/1ic9n6t/deepseeks\_ai\_breakthrough\_bypasses\_nvidias/](https://www.reddit.com/r/technology/comments/1ic9n6t/deepseeks_ai_breakthrough_bypasses_nvidias/)  
15\. Problems with hand-made PTX and driver API Difficulty getting a simple hand-written PTX program to w \- CUDA Programming and Performance \- NVIDIA Developer Forums, accessed February 1, 2025, [https://forums.developer.nvidia.com/t/problems-with-hand-made-ptx-and-driver-api-difficulty-getting-a-simple-hand-written-ptx-program-to-w/24553](https://forums.developer.nvidia.com/t/problems-with-hand-made-ptx-and-driver-api-difficulty-getting-a-simple-hand-written-ptx-program-to-w/24553)  
16\. What is DeepSeek, and why is it causing Nvidia and other stocks to slump? \- CBS News, accessed February 1, 2025, [https://www.cbsnews.com/news/what-is-deepseek-ai-china-stock-nvidia-nvda-asml/](https://www.cbsnews.com/news/what-is-deepseek-ai-china-stock-nvidia-nvda-asml/)  
17\. As Nvidia Stock Drops, Has The AI Chip Bubble Finally Burst? \- EE Times, accessed February 1, 2025, [https://www.eetimes.com/as-nvidia-stock-drops-15-has-the-ai-chip-bubble-finally-burst/](https://www.eetimes.com/as-nvidia-stock-drops-15-has-the-ai-chip-bubble-finally-burst/)