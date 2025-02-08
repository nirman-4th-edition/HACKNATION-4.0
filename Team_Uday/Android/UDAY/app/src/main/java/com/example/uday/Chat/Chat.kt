package com.example.uday.Chat

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.example.uday.databinding.FragmentChatBatBinding

class Chat : Fragment() {

    private var _binding: FragmentChatBatBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        // Inflate the layout using view binding
        _binding = FragmentChatBatBinding.inflate(inflater, container, false)

        // Setup the ViewPager and TabLayout
        setupViewPager()

        return binding.root
    }

    private fun setupViewPager() {
        val fragmentArrayList = ArrayList<Fragment>()
        fragmentArrayList.add(chat_list_fragment()) // Replace with your fragment
        fragmentArrayList.add(call_fragment()) // Replace with your fragment

        val adapter = chat_frag_adapter(this, childFragmentManager, fragmentArrayList) // Corrected fragment manager
        binding.viewpager.adapter = adapter
        binding.chatTablayout.setupWithViewPager(binding.viewpager)

    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null // Avoid memory leaks
    }
}
